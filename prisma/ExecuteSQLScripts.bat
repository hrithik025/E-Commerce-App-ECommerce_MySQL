@echo off
REM Script to execute a SQL file against MySQL with hardcoded values.

REM **1.  Set Error Handling**
SETLOCAL enabledelayedexpansion

REM **2.  Declare the MySQL connection variables (HARDCODED - CHANGE THESE)**
SET MYSQL_HOST=localhost
SET MYSQL_PORT=3306
SET MYSQL_USER=root
SET MYSQL_PASSWORD=steveRogers7
SET MYSQL_DATABASE=ecommerce
SET SQL_FILE=SQLServerScripts/ConsolidatedScripts.sql

REM **3.  Check if SQL file exists**
IF NOT EXIST "%SQL_FILE%" (
    ECHO Error: SQL file not found at %SQL_FILE%
    EXIT /B 1
)

REM **4.  Execute the SQL script**
ECHO Executing SQL Script...
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -p%MYSQL_PASSWORD% %MYSQL_DATABASE% < "%SQL_FILE%"
IF %ERRORLEVEL% NEQ 0 (
    ECHO Error executing SQL file.
    EXIT /B %ERRORLEVEL%
)

REM **5.  Execute stored procedure calls**
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -p%MYSQL_PASSWORD% -D %MYSQL_DATABASE% -e "CALL CreateOrder(1, 1, NULL);"
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -p%MYSQL_PASSWORD% -D %MYSQL_DATABASE% -e "CALL CreateOrder(2, 2, NULL);"
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -p%MYSQL_PASSWORD% -D %MYSQL_DATABASE% -e "CALL CreateOrder(3, 3, NULL);"
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -p%MYSQL_PASSWORD% -D %MYSQL_DATABASE% -e "CALL CreateOrder(4, 4, NULL);"
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h %MYSQL_HOST% -P %MYSQL_PORT% -u %MYSQL_USER% -p%MYSQL_PASSWORD% -D %MYSQL_DATABASE% -e "CALL CreateOrder(5, 5, NULL);"

REM **6.  Check final result**
IF %ERRORLEVEL% NEQ 0 (
    ECHO Error executing stored procedures.
    EXIT /B %ERRORLEVEL%
)

ECHO SQL script and stored procedures executed successfully.

ENDLOCAL
