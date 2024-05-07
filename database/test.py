import re
from datetime import datetime

index = 3
myfile = f'employee_{index}'

# Read SQL file
with open(f'database/{myfile}.sql', 'r') as file:
    sql_lines = file.readlines()

# Extract datetime from SQL lines and create a list of tuples (datetime, line)
datetime_line_tuples = []
for line in sql_lines:
    match = re.search(r"'(\d{4}-\d{2}-\d{2})', '(\d{2}:\d{2}:\d{2})'", line)
    if match:
        date_time = datetime.strptime(match.group(1) + ' ' + match.group(2), '%Y-%m-%d %H:%M:%S')
        datetime_line_tuples.append((date_time, line))

# Sort the list of tuples by datetime in ascending order
sorted_tuples = sorted(datetime_line_tuples, key=lambda x: x[0])

# Write sorted lines to a new SQL file
with open(f'database/{myfile}.sql', 'w') as file:
    for _, line in sorted_tuples:
        file.write(line)

print("Sorted SQL file created successfully.")

with open(f'database/{myfile}.sql', 'r') as file:
    sql_lines = file.readlines()

# Modify lines based on odd/even line number
modified_lines = []
for i, line in enumerate(sql_lines):
    match = re.search(r"'(\d{4}-\d{2}-\d{2})', '(\d{2}:\d{2}:\d{2})'", line)
    if match:
        date = match.group(1)
        time = match.group(2)
        if i % 2 == 0:  # Even line number
            modified_line = f"CALL check_in ({index}, 1, '{date}', '{time}', 'Normal', 'go in', 'check in');"
        else:  # Odd line number
            modified_line = f"CALL check_in ({index}, 2, '{date}', '{time}', 'Normal', 'go out', 'check out');"
        modified_lines.append(modified_line)

# Write modified lines to a new SQL file
with open(f'database/{myfile}.sql', 'w') as file:
    for line in modified_lines:
        file.write(line + '\n')

print("Modified SQL file created successfully.")
