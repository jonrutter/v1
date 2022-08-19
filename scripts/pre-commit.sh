#!/bin/bash

YELLOW='\033[1;33m'
DEFAULT='\e[0;39;49m\e[K'

echo -e "${YELLOW}\nRunning pre-commit checks...\n${DEFAULT}"

lint-staged --quiet
