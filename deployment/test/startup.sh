# #!/bin/bash
## Start the first process
(cd /e2e/client-app; nohup npm run dev >/dev/null 2>&1 &)
while ! echo exit | nc localhost 3000; do sleep 10; done
echo "React server up"
while ! echo exit | nc localhost 5000; do sleep 10; done
echo "Backend server up"

## Start the second process
BRO="${BROWSER:-chrome}"
# TEST="home"
echo "running test ${TEST} on browser ${BRO}"
if [ -z ${TEST} ]; then
 (cd /e2e/client-app; npx cypress run --browser $BRO )
else case $TEST in
  profile)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/profile.cy.ts --browser $BRO )
    ;;

  auth)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/auth.cy.ts --browser $BRO  )
    ;;

  manage)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/manage-activity.cy.ts --browser $BRO )
    ;;

  activities)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/activities.cy.ts --browser $BRO )
    ;;

  activity)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/activity.cy.ts --browser $BRO )
    ;;

  createactivity)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/create-activity.cy.ts --browser $BRO )    
    ;;

  home)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/home.cy.ts --browser $BRO )
    ;;
esac;
fi