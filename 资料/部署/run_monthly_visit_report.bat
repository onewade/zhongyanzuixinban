@echo off
setlocal
cd /d "%~dp0"
"C:\Users\12410\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" "%~dp0monthly_visit_report.py" >> "%~dp0monthly_visit_report_task.log" 2>&1
endlocal
