#!/usr/bin/env bash
if [ $# -eq 1 ] && [ "$1" == 'clear' ]; then echo 'TRUNCATE TABLE allwishes_test\G' | mysql -ugrandma -p wishdb; fi
if [ $# -eq 1 ] && [ "$1" == 'show' ]; then echo 'SELECT * from allwishes_test\G' | mysql -ugrandma -p wishdb; fi
