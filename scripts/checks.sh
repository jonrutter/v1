#!/bin/bash

YELLOW='\e[1;33m'
GREEN='\e[1;32m'
RED='\e[0;31m'
DEFAULT='\e[0;39;49m\e[K'
REDBG='\e[0;39;41m'
GREENBG='\e[1;39;42m'

echo -e "${YELLOW}Running validation checks...${DEFAULT}\n"

if npx concurrently \
  --kill-others-on-fail \
  --prefix "[{name}]" \
  --names "typecheck,lint,test,build" \
  --prefix-colors "bgBlue.bold.white,bgYellow.bold,bgCyan.bold,bgMagenta.bold.white" \
    "echo 'Checking types...' && npm run typecheck --silent" \
    "echo 'Linting files...' && npm run lint --silent" \
    "echo 'Running all tests...' && npm run test:ci --silent" \
    "echo 'Testing build...' && npm run build --silent"
then 
  echo -e "${GREENBG}\n All checks passed! ${DEFAULT}\n"
else
  echo -e "${REDBG}\n Some checks did not pass. ${DEFAULT}\n"
fi