# [PlannerBuddy-MobileApp](https://plannerbuddy.vitabletech.in/)

In this application we are using React native Technology for development of mobile apps. 

## Configuring SSH Key in GitLab Profile

Follow these steps to generate an SSH key and add it to your GitLab profile:

1. Open your terminal and run the following command to generate an SSH key:
    ```ssh
    ssh-keygen -t ed25519 -C 'your_email@example.com'
    ```
    Replace 'your_email@example.com' with your actual email address.
2. When prompted, press Enter to accept the default file location and to set no passphrase.
3. Once the SSH key is generated, you need to copy the public key. This is located in a .pub file in the .ssh directory. On a Mac, the path to this directory is typically /Users/<YourUsername>/.ssh.
4. Open the .pub file with a text editor, copy its contents, and add it to your GitLab profile under SSH Keys.

## Installation

First, clone the repository:


```bash
git clone git@gitlab.com:vitabletech/plannerbuddy-mobileapp.git
```

Then, navigate to the project directory and install the dependencies:

```bash
cd plannerbuddy-mobileapp
npm install
```

## Usage

To start the application, run:

```bash 
npm start
```


## [Click me to see the Features](https://plannerbuddy.vitabletech.in/)


## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/vitabletech/plannerbuddy-mobileapp/-/settings/integrations)


## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)


## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing (SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)


## [Roadmap](https://www.figma.com/file/KSIlALCXd9kX5BerYB8DcI/Planer-Buddy?type=design&node-id=0-1&mode=design&t=LEFc4NI1f5xujlK6-0)


## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
- Not for Public Use

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

