import git

def create_repo(url :str, path :str):
    git.Repo.clone_from(url, path)