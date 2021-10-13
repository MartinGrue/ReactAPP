# #!/bin/bash
# # Start the first process
(cd /e2e/client-app; nohup npm run start &)
# # Start the second process
sleep 10
# (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/profile.spec.ts --spec cypress/tests/ui/manage-activity.spec.ts)

case $TEST in

  profile)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/profile.spec.ts --browser $BRO )
    ;;

  auth)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/auth.spec.ts --browser $BRO  )
    ;;

  manage)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/manage-activity.spec.ts --browser $BRO )
    ;;

  activities)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/activities.spec.ts --browser $BRO )
    ;;

  activity)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/activity.spec.ts --browser $BRO )
    ;;

  createactivity)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/create-activity.spec.ts --browser $BRO )    
    ;;

  home)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/home.spec.ts --browser $BRO )
    ;;
esac
