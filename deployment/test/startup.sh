# #!/bin/bash
# # Start the first process
(cd /e2e/client-app; nohup npm run start &)
# # Start the second process
sleep 10
# (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/profile.spec.ts --spec cypress/tests/ui/manage-activity.spec.ts)

case $TEST in

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
esac
