# Healthgrades Site Health Dashboard

# Test Urls
http://healthboards.herokuapp.com/gauge&q=inputname:hgphoenix AND -json.userAgent:TestBot AND (json.message.errorcode:[-1 TO 403] OR json.message.errorcode:[405 TO 1000])&from=NOW-1HOUR&minText=min&minVal=0&maxText=max&maxVal=100
http://healthboards.herokuapp.com/gauge?q=json.message.errorcode:404%20AND%20inputname:hgphoenix%20-json.userAgent:TestBot&from=NOW-1HOUR&minText=min&minVal=0&maxText=max&maxVal=100

# Git Note: I had to recreate the git repository, through the command line.
# Then things seem to take, I did create the heroku application throught the ui.

# Git Publishing instructions
git remote add origin git@github.com:username/Hello-World.gitSets the origin for the Hello-World repo
git push origin master

Global setup:
 Set up git
  git config --global user.name "Justin England"
  git config --global user.email justengland@gmail.com
      
Next steps:
  mkdir FireBall
  cd FireBall
  git init
  touch README
  git add README
  git commit -m 'first commit'
  git remote add origin git@github.com:justengland/FireBall.git 
  git push -u origin master
      
Existing Git Repo?
  cd existing_git_repo
  git remote add origin git@github.com:justengland/FireBall.git
  git push -u origin master
      
Importing a Subversion Repo?
  Click here
      
When you're done:
  Continue