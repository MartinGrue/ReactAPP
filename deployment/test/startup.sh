# #!/bin/bash
# # Start the first process
(cd /e2e/client-app; nohup npm run dev >/dev/null 2>&1 &)
# # Start the second process
sleep 10
BROWSER="${BRO:-chrome}"
if [ -z ${TEST} ]; then
 (cd /e2e/client-app; npx cypress run --browser $BROWSER )
else case $TEST in
  profile)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/profile.spec.ts --browser $BROWSER )
    ;;

  auth)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/auth.spec.ts --browser $BROWSER  )
    ;;

  manage)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/manage-activity.spec.ts --browser $BROWSER )
    ;;

  activities)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/activities.spec.ts --browser $BROWSER )
    ;;

  activity)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/activity.spec.ts --browser $BROWSER )
    ;;

  createactivity)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/create-activity.spec.ts --browser $BROWSER )    
    ;;

  home)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/home.spec.ts --browser $BROWSER )
    ;;
esac;
fi
