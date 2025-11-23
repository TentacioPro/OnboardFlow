etting up and installing the ADK
1
Installing the ADK

Use the following command to install the ADK with pip:
BASH

Copy

Ask AI
pip install --upgrade ibm-watsonx-orchestrate
You can optionally use a virtual environment (venv) or a version manager like uv to control the packages you install. This setup makes it easier to share and distribute your agents and tools with others.
To learn how to install the ADK in these situations, see the following steps:
System installation
Virtual environments
uv
Install the ADK on your system with the following command:

Copy

Ask AI
pip install  --upgrade ibm-watsonx-orchestrate
2
Configure your environment in the ADK

Configure your watsonx Orchestrate environment in the ADK. Use this environment to create your agents.
In this step, you need access to specific credentials for your environment. If you don’t know the type of environment you have, see Logging in to IBM watsonx Orchestrate.
IBM Cloud

To connect to IBM Cloud, you need both the service instance URL and an API key of your watsonx Orchestrate instance.
Don’t use the credentials that you get from the IBM Cloud resources page. Use the following procedure to get the appropriate API key and service instance URL.
1
Log in to your watsonx Orchestrate instance.
2
Click your user icon on the top right and click Settings.

3
Go to the API details tab.
4
Copy the service instance URL.
5
Click the Generate API key button.

6
Generate an API Key

The page redirects you to the IBM Cloud Identity Access Management center. Click Create to create a new API Key.

7
Enter a name and a description for your API Key.

8
Copy the API key and store it in a safe vault.

9
Add and activate your environment with the ADK CLI:
BASH

Copy

Ask AI
orchestrate env add <environment-name> -u <service-instance-url> --type ibm_iam --activate
Note:
You can set any name you prefer for the environment.
For more information, see Configuring your environments.
AWS

On-premises

To add your environment, run the following.
BASH

Copy

Ask AI
    orchestrate env add -n <environment-name> -u <service-instance-url>
Note:
You can set any name you prefer for the environment.
In the rare case when the watsonx Orchestrate ADK does not automatically infer the correct authentication type for your url please add the following to the orchestrate env add command:
IBM Cloud: --type ibm_iam
AWS: --type mcsp
On-premises: --type cpd
3
Activate your environment

Run the following command to activate the environment you created:

Copy

Ask AI
orchestrate env activate <environment-name>
If you need to change your environment, see Configuring your environments.
Note: You can also activate a local development environment. This environment is provided by the watsonx Orchestrate Developer Edition, a stripped-down version of watsonx Orchestrate that runs under a Docker container to be used as a development server. To learn more about it, see watsonx Orchestrate Developer Edition.
​
Creating your first agent
With your ADK connected to your watsonx Orchestrate instance, you’re ready to test your setup by publishing a simple agent.
In watsonx Orchestrate, you define agents using YAML or JSON files. The agent specification file includes key details like the agent’s name, kind, instructions for the LLM, and the tools it can use.
When you build agents with the ADK, you write this specification yourself. This approach gives you full control over your agent’s behavior and capabilities. You can create advanced agents with custom tools, collaborators, or integrations. For now, start with a minimal Hello World agent to verify your setup.
1
Starting your ADK project

As a Python project, it’s a good practice to create a folder that stores your agents, tools, and other resources.
Example of folder structure:

Copy

Ask AI
.
└── adk-project/
    ├── agents/
    ├── tools/
    ├── knowledge/
    ├── flows/
    └── ...

macOS & Linux

Windows

Copy

Ask AI
$folders = "agents", "tools", "knowledge", "flows"
New-Item -Path "adk-project" -ItemType Directory
foreach ($folder in $folders) {
    New-Item -Path "adk-project\$folder" -ItemType Directory
}
2
Creating the agent specification

Start by creating the YAML file for the agent and name the file as hello-world-agent.yaml. Open the created file with the text editor of your choice, then copy and paste the following code.
hello-world-agent.yaml

Copy

Ask AI
spec_version: v1 
kind: native 
name: Hello_World_Agent 
description: A simple Hello World agent 
instructions: "You are a test agent created for a tutorial on how to get started with watsonx Orchestrate ADK. When the user asks 'who are you', respond with: I'm the Hello World Agent. Congratulations on completing the Getting Started with watsonx Orchestrate ADK tutorial!"
llm: watsonx/meta-llama/llama-3-2-90b-vision-instruct 
style: default 
collaborators: [] 
tools: [] 
See all 9 lines
And save the file in the agents folder.
3
Import the agent

Open your terminal and navigate to the folder where you created the YAML file. Then run the following command to publish your agent:

Copy

Ask AI
orchestrate agents import -f hello-world-agent.yaml 
If the import is successful, you get the following confirmation message:

Copy

Ask AI
[INFO] - Agent 'Hello World Agent' imported successfully
4
Open the Agent Builder

Log in to your watsonx Orchestrate instance and open the Agent Builder:
Open the Agent Builder
5
Select the Hello World agent

In the Build agents and tools page, select the Hello_World_Agent.
Select the agent
6
Test your agent

In this page, you can customize your agent’s behavior. Use the test chat to test your agent.