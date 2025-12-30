chmod +x ./entrypoint.sh
docker-compose up -d --build

<!-- get the shell access of database -->

docker exec -it database psql -U postgres

<!-- get the shell access of backend -->

docker exec -it backend /bin/sh
./manage.py shell
from user.tasks import new_shared_task
new_shared_task.delay()
