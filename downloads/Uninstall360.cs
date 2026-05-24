using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Security.Principal;
using Microsoft.Win32;

namespace Uninstall360
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Title = "360 Safeguard Removal Tool";
            WriteColor("========================================", ConsoleColor.Cyan);
            WriteColor("   360 Safeguard Removal Tool v1.0", ConsoleColor.Cyan);
            WriteColor("========================================", ConsoleColor.Cyan);
            Console.WriteLine();

            if (!IsAdministrator())
            {
                WriteColor("[!] Requesting administrator privileges...", ConsoleColor.Yellow);
                RestartAsAdmin();
                return;
            }

            WriteColor("[*] Starting 360 Safeguard removal...", ConsoleColor.Green);
            Console.WriteLine();

            Step(1, 7, "Stopping processes...");
            KillProcesses();

            Step(2, 7, "Stopping services...");
            StopServices();

            Step(3, 7, "Running official uninstaller...");
            RunUninstaller();

            Step(4, 7, "Removing installation directory...");
            RemoveDirectory();

            Step(5, 7, "Cleaning registry...");
            CleanRegistry();

            Step(6, 7, "Cleaning shortcuts...");
            CleanShortcuts();

            Step(7, 7, "Scheduling boot-time cleanup...");
            ScheduleBootTimeDelete();

            Console.WriteLine();
            WriteColor("========================================", ConsoleColor.Green);
            WriteColor("   Removal complete! Reboot to finalize.", ConsoleColor.Green);
            WriteColor("========================================", ConsoleColor.Green);
            Console.WriteLine();
            Console.Write("Reboot now? (Y/N): ");
            var key = Console.ReadKey();
            Console.WriteLine();
            if (key.Key == ConsoleKey.Y)
            {
                Process.Start("shutdown", "/r /t 3 /c \"360 removal complete, rebooting\"");
            }
        }

        static bool IsAdministrator()
        {
            var identity = WindowsIdentity.GetCurrent();
            var principal = new WindowsPrincipal(identity);
            return principal.IsInRole(WindowsBuiltInRole.Administrator);
        }

        static void RestartAsAdmin()
        {
            var startInfo = new ProcessStartInfo
            {
                UseShellExecute = true,
                FileName = Process.GetCurrentProcess().MainModule.FileName,
                Verb = "runas"
            };
            try
            {
                Process.Start(startInfo);
            }
            catch (Exception ex)
            {
                WriteColor("[-] Admin rights required: " + ex.Message, ConsoleColor.Red);
                Console.WriteLine("Please right-click and select 'Run as administrator'.");
            }
            Environment.Exit(0);
        }

        static void Step(int num, int total, string msg)
        {
            Console.Write("[");
            WriteColor(num + "/" + total, ConsoleColor.Yellow);
            Console.Write("] " + msg + " ");
        }

        static void WriteColor(string text, ConsoleColor color)
        {
            var old = Console.ForegroundColor;
            Console.ForegroundColor = color;
            Console.WriteLine(text);
            Console.ForegroundColor = old;
        }

        static void KillProcesses()
        {
            string[] targets = { "360Safe", "360Tray", "safesvr", "ZhuDongFangYu",
                                 "360deskana", "360deskana64", "360AppLoader",
                                 "360BoxLd", "360BoxLd64", "360boxmain",
                                 "LiveUpdate360", "SoftMgr", "360speedld",
                                 "360PatchMgr", "360DocProt" };
            int count = 0;
            foreach (var name in targets)
            {
                try
                {
                    var procs = Process.GetProcessesByName(name);
                    foreach (var p in procs)
                    {
                        p.Kill();
                        p.WaitForExit(1000);
                        count++;
                    }
                }
                catch { }
            }
            System.Threading.Thread.Sleep(500);
            Console.WriteLine("Done (" + count + " processes killed)");
        }

        static void StopServices()
        {
            string[] services = { "ZhuDongFangYu", "Q360AMPPL" };
            foreach (var svc in services)
            {
                try
                {
                    var p1 = Process.Start("sc", "stop " + svc);
                    p1.WaitForExit(5000);
                    var p2 = Process.Start("sc", "config " + svc + " start= disabled");
                    p2.WaitForExit(3000);
                }
                catch { }
            }
            System.Threading.Thread.Sleep(1000);
            Console.WriteLine("Done");
        }

        static void RunUninstaller()
        {
            string path = @"C:\Program Files (x86)\360\360Safe\uninst.exe";
            if (File.Exists(path))
            {
                try
                {
                    WriteColor("    Found uninstaller, launching...", ConsoleColor.Gray);
                    var p = Process.Start(path);
                    p.WaitForExit(8000);
                    Console.WriteLine("Done");
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Failed: " + ex.Message);
                }
            }
            else
            {
                Console.WriteLine("Not found (already uninstalled?)");
            }
        }

        static void RemoveDirectory()
        {
            string dir = @"C:\Program Files (x86)\360";
            if (!Directory.Exists(dir))
            {
                Console.WriteLine("Already removed");
                return;
            }
            try
            {
                WriteColor("    Taking ownership...", ConsoleColor.Gray);
                var p1 = Process.Start("takeown", "/F \"" + dir + "\" /R /D Y 2>nul");
                if (p1 != null) p1.WaitForExit(10000);
                var p2 = Process.Start("icacls", "\"" + dir + "\" /grant Administrators:F /T /Q 2>nul");
                if (p2 != null) p2.WaitForExit(10000);
                Directory.Delete(dir, true);
                Console.WriteLine("Done");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Will remove on reboot - " + ex.Message);
            }
        }

        static void CleanRegistry()
        {
            int count = 0;
            string[] baseKeys = {
                @"SOFTWARE\WOW6432Node\360Safe",
                @"SOFTWARE\360Safe",
                @"SYSTEM\CurrentControlSet\Services\ZhuDongFangYu",
                @"SYSTEM\CurrentControlSet\Services\Q360AMPPL",
            };
            foreach (var subKey in baseKeys)
            {
                try
                {
                    Registry.LocalMachine.DeleteSubKeyTree(subKey, false);
                    count++;
                }
                catch { }
            }

            string[] runPaths = {
                @"SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
                @"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run",
                @"SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce",
            };
            foreach (var path in runPaths)
            {
                try
                {
                    using (var key = Registry.LocalMachine.OpenSubKey(path, true))
                    {
                        if (key == null) continue;
                        var names = key.GetValueNames();
                        foreach (var n in names)
                        {
                            if (n.IndexOf("360", StringComparison.OrdinalIgnoreCase) >= 0)
                            {
                                key.DeleteValue(n);
                                count++;
                            }
                        }
                    }
                }
                catch { }
            }

            try
            {
                using (var key = Registry.CurrentUser.OpenSubKey(
                    @"SOFTWARE\Microsoft\Windows\CurrentVersion\Run", true))
                {
                    if (key != null)
                    {
                        var names = key.GetValueNames();
                        foreach (var n in names)
                        {
                            if (n.IndexOf("360", StringComparison.OrdinalIgnoreCase) >= 0)
                            {
                                key.DeleteValue(n);
                                count++;
                            }
                        }
                    }
                }
            }
            catch { }

            Console.WriteLine("Done (" + count + " items cleaned)");
        }

        static void CleanShortcuts()
        {
            int count = 0;
            string[] searchDirs = {
                Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
                Environment.GetFolderPath(Environment.SpecialFolder.StartMenu) + @"\Programs",
            };
            foreach (var dir in searchDirs)
            {
                if (!Directory.Exists(dir)) continue;
                try
                {
                    var files = Directory.GetFiles(dir, "*360*", SearchOption.AllDirectories);
                    foreach (var f in files)
                    {
                        File.Delete(f);
                        count++;
                    }
                }
                catch { }
            }
            Console.WriteLine("Done (" + count + " shortcuts removed)");
        }

        static void ScheduleBootTimeDelete()
        {
            try
            {
                using (var key = Registry.LocalMachine.OpenSubKey(
                    @"SYSTEM\CurrentControlSet\Control\Session Manager", true))
                {
                    if (key == null)
                    {
                        Console.WriteLine("Failed - cannot open registry key");
                        return;
                    }
                    var existing = key.GetValue("PendingFileRenameOperations") as string[];
                    var list = existing != null
                        ? new List<string>(existing)
                        : new List<string>();
                    var entry = @"\??\C:\Program Files (x86)\360";
                    if (!list.Contains(entry))
                    {
                        list.Add(entry);
                        list.Add("");
                        key.SetValue("PendingFileRenameOperations", list.ToArray(),
                            RegistryValueKind.MultiString);
                    }
                }
                Console.WriteLine("Done");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed: " + ex.Message);
            }
        }
    }
}
