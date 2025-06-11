@echo off

set "relativeFolderPath=SQLServerScripts"

if not exist "%relativeFolderPath%" (
    echo Folder "%relativeFolderPath%" not found. Please create it.
    exit /b 1
)

if exist "%relativeFolderPath%\ConsolidatedScripts.sql" (
    echo ConsolidatedScripts.sql found in "%relativeFolderPath%". Overwriting...
    del "%relativeFolderPath%\ConsolidatedScripts.sql"
) else (
    echo ConsolidatedScripts.sql not found in "%relativeFolderPath%". Creating...
)

for %%f in ("%relativeFolderPath%\*.sql") do (
    if not "%%~nxf"=="ConsolidatedScripts.sql" (
        echo Adding "%%~nxf"...
        type "%%f" >> "%relativeFolderPath%\ConsolidatedScripts.sql"
        echo. >> "%relativeFolderPath%\ConsolidatedScripts.sql"
    )
)

echo.
echo Done! ConsolidatedScripts.sql has been created or overwritten in "%relativeFolderPath%".
exit /b 0