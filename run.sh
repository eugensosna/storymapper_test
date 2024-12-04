#!/bin/bash 
export CI='true'
npx playwright test --project=chromium --trace=on --reporter=line