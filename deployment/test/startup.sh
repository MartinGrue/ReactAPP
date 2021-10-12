# #!/bin/bash
# # Start the first process
(cd /e2e/client-app; nohup npm run start &)
# # Start the second process
sleep 10
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

#   *)
#     echo -n "unknown"
#     ;;
esac
