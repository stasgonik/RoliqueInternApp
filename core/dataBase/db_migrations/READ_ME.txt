To start using migrations, run 'npm install' and copy 'migrations' folder into node_modules/.bin
Then, go to this directory with cd node_modules/.bin
Now you have one of the following options:
1)migrate list -d mongodb://localhost/migrations - check all available migrations and their current state.
2)migrate up createAdmin -d mongodb://localhost/migrations - run createAdmin up-migration, which creates admin in the rolique database.
3)migrate down createAdmin -d mongodb://localhost/migrations - run createAdmin down-migration, which deletes admin from the rolique database.
Of course, you can replace createAdmin with any other available migration at 'migrations' folder
