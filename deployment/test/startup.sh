#!/bin/bash
# Start the first process
(cd /e2e/client-app; nohup npm run start &)
# Start the second process
(cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/home.spec.ts )


