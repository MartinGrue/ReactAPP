# #!/bin/bash
# # Start the first process
(cd /e2e/client-app; nohup npm run start &)
# # Start the second process
sleep 5
# (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/profile.spec.ts --spec cypress/tests/ui/manage-activity.spec.ts)

case $TEST in

  profile)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/profile.spec.ts )
    ;;

  auth)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/auth.spec.ts )
    ;;

  manage)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/manage-activity.spec.ts )
    ;;

  activities)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/activities.spec.ts )
    ;;

  activity)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/activity.spec.ts )
    ;;

  createactivity)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/create-activity.spec.ts )    
    ;;

  home)
    (cd /e2e/client-app; npx cypress run --spec cypress/tests/ui/home.spec.ts )
    ;;
esac
