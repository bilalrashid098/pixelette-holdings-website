@echo off
REM ---------------------------------------------------------------------------
REM Pixelette Holdings - start the Next.js dev server.
REM
REM Double-click this file, or run it from any terminal. It installs
REM dependencies on first run, then starts the dev server and opens the browser.
REM
REM Structure note: the install loop is deliberately NOT inside a parenthesised
REM block. Batch expands %VAR% once when it parses a block, so a counter inside
REM one never increments, and GOTO jumps out of a block entirely. Labels and
REM loops therefore stay at the top level. This is a rewrite of a version that
REM had exactly that bug.
REM ---------------------------------------------------------------------------

setlocal EnableDelayedExpansion
cd /d "%~dp0"
set "LOG=%~dp0install-log.txt"

echo.
echo   Pixelette Holdings - Next.js dev server
echo   %CD%
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo   ERROR: Node.js is not on PATH. Install Node 20+ and try again.
  echo.
  pause
  exit /b 1
)

for /f "delims=" %%v in ('node -v') do echo   node %%v
for /f "delims=" %%v in ('npm -v') do echo   npm  %%v
echo.

if exist "node_modules" goto rundev

REM --------------------------------------------------------------- install
echo   Installing dependencies - first run only, takes a minute.
echo   Full output goes to install-log.txt
echo.

echo ================ npm config ================ > "%LOG%"
call npm config list >> "%LOG%" 2>&1
echo. >> "%LOG%"

REM Retry settings live in C:\Users\Rana\.npmrc and apply automatically.
REM Repeated attempts help because npm keeps what it already downloaded, so
REM each attempt resumes further along rather than starting over.
set ATTEMPT=0

:installloop
set /a ATTEMPT+=1
echo   Attempt !ATTEMPT! of 6...
echo. >> "%LOG%"
echo ============ attempt !ATTEMPT! ============ >> "%LOG%"
call npm install --no-audit --no-fund >> "%LOG%" 2>&1
if not errorlevel 1 goto installok
if !ATTEMPT! GEQ 6 goto installfailed
echo   Failed. Waiting 15s before retrying...
timeout /t 15 /nobreak >nul
goto installloop

:installfailed
echo.
echo   ERROR: all 6 attempts failed.
echo   Full log: %LOG%
echo.
echo   ---------------- last 40 lines ----------------
powershell -NoProfile -Command "Get-Content '%LOG%' -Tail 40"
echo   -----------------------------------------------
echo.
pause
exit /b 1

:installok
echo.
echo   Dependencies installed.
echo.

REM --------------------------------------------------------------- dev server
:rundev
echo   Starting dev server on http://localhost:3020
echo   Press Ctrl+C to stop.
echo.

start "" "http://localhost:3020"
call npm run dev -- -p 3020

echo.
echo   Server stopped.
pause
endlocal
