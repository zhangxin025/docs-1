# Creating a Conversation

> Creating a conversation immediately starts accumulating usage.When you create a conversation CVI immediately starts running and the replica waits in the WebRTC/Daily room listening for your participant to join. Your billing/Duration usage starts as soon as the conversation is creating and runs until the conversation timeout or when you end the conversation. This also uses up one of your concurrency spots.

# How do I create a conversation?

Once you have a persona you’d like to use or a replica, starting a conversation is easy. You can start a conversation on the developer app by visiting the [**Create Conversation page**](https://platform.duix.com/create).

# What does creating a conversation do?

Creating a conversation is ‘starting the call’. Imagine you create a Video Sessions\- that’s what happens when you create a conversation.

1.  A WebRTC
    
2.  The replica joins the Video Sessions
    
3.  Starts the timers on duration/timeouts
    

In response to creating a conversation, you receive a Sessions URL. You or your participant can directly join this link and Start the conversation where you can immediately start conversing with the replica. **However, you do not have to use this meeting UI.** You can create a completely custom UI or access the raw streams.

### What is Daily?

Daily is our WebRTC provider. You do not have to create a Daily account. We have partnered with Daily to allow you to get an end to end solution without having to worry about WebRTC. You can build a completely custom application with CVI while accessing the Daily streams like you would with WebRTC.

# What can I customize per conversation?

Conversation specific customizations are focused on allowing personalization of a conversation to a specific participant. As an example you might want to have a custom introduction per person, or change the language the replica is listening for and responds in. Meanwhile persona level configurations are settings or defaults applied to all conversations so you do not have to configure them each time, such as setting up your LLM.

Here are the things you can customize per conversation:

### Persona / Replica

In order to start a conversation you must provide a persona or replica. If you provide a replica with no persona, the default DUIX persona will be used. Providing a persona without a replica will use the default replica attached to the persona if it exists. Providing a replica ID will override the default one associated with the persona.

### Conversation Context

Conversation context is specific information or instructions for the LLM related to this conversation. For example it can contain information on who is joining the call as well as any specific information on the point of the call, background information or current information.

Example of conversation context:

> Xiao Yao is my girlfriend. We usually video call each other at 8 PM sharp, but tonight I had to work late until 10 PM. So, I just called her, and she was really concerned about me having to work so late.She went camping in the mountains with friends today and shared fun stories about her day with me. Even though I couldn’t be there, she kept saying how much she missed me.

The conversation context will be appended to the system prompt and the persona context/knowledge base.

### Custom Greeting

When a participant joins the replica will say a greeting that you can customize. You can use this to personalize a welcome message for someone or prompt them to start a conversation.

By default the replica will say “Hey there, how’s it going? What can I do for you today?”.

### Language

You can customize what language CVI understands and speaks in. For example you could set the conversation to be in Spanish. Setting the language ensures the layers (ASR/TTS) are configured correctly to handle the language. If you are using your own TTS voice, you’ll need to make ensure it supports the language you specify.