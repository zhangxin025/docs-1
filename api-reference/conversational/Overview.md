## 

![image.png](../assets/conversation_bg.jpg)

The Conversational Video Interface (CVI) is an end-to-end pipeline for creating real-time multimodal video conversations with an avatar that can see, hear, and respond similarly to how a human would. Developers can deploy video AI agents in minutes using CVI.

CVI is the world's fastest interface of its kind, allowing you to put a human face and conversational ability to your AI agent or personality. With CVI, you can achieve utterance-to-utterance latency with SLAs as fast as under 1 second, which is the full roundtrip time for a participant to say something and for the avatar to speak back.

CVI provides a complete pipeline to have a conversation while also allowing you to customize and plug in your existing components where necessary.

## Key Features

<CardGroup cols="2">
  <Card title="Face-to-face interactions" icon="sparkles" color="#f14acc">
    The first interface that speaks our language. CVI is multimodal and understands and uses facial expressions, body language, and has natural conversational awareness including interrupts and turn-taking.
  </Card>
  <Card title="World's lowest latency" icon="sparkles" color="#eb4ccf">
    The world’s fastest interface of its kind, with SLAs as fast as under 1s latency utterance-to-utterance.
  </Card>
</CardGroup>

<CardGroup cols="2">
  <Card title="End-to-end solution" icon="sparkles" color="#e561d1">
    CVI provides a turn-key solution, delivering all the components to easily deploy AI video agents without having to worry about WebRTC, ASR, or anything else.
  </Card>
  <Card title="Focused on naturalness" icon="sparkles" color="#ef54e7">
    Easily create high-quality AI avatars of you or your customers, powered by our state-of-the-art avatar models.
  </Card>
</CardGroup>

## Face-to-face interactions

The first interface that speaks our language. CVI is multimodal and understands and uses facial expressions, body language, and has natural conversational awareness including interrupts and turn-taking.

## World's lowest latency

The world's fastest interface of its kind, with SLAs as fast as under 1s latency utterance-to-utterance.

## End-to-end solution

CVI provides a turn-key solution, delivering all the components to easily deploy AI video agents without having to worry about WebRTC, ASR, or anything else.

## Focused on naturalness

Easily create high-quality AI avatars of you or your customers, powered by our state-of-the-art avatar models.

## What does a conversation with CVI look like?

### Here's a sample:

<video controls className="w-full aspect-video" src="../assets/conversationdemo.mp4" />

### Try it out\!

You can try chatting with Elara on our website to get a taste of what a conversation with CVI looks like.[\*\*Try Out CVI Now\!\*\*Note that Elara can see and hear you.](https://duix.com/platform/create)

## What components does CVI provide, and what can I customize?

CVI provides a full pipeline allowing you to easily create video conversations. You can immediately jump into a real-time conversation with the generated Session link URL. CVI provides the following layers:

- WebRTC/Session link (using Daily)
- Speech recognition (ASR), with interrupts, and Semantic/Lexical turn taking, using our model.
- Optimized, conversational LLM
- Text-to-speech (TTS)

You can choose to customize or bring your own layers as well. For example, you can:

- Use OpenAI real-time API or other voice-to-voice models
- Bring your own LLM/conversation logic or enable function calling for DUIX-optimized LLMs.
- Customize the TTS or ASR engine, and turn taking settings
- Use text parrot mode to directly drive an avatar video.
- Directly access the video streams and create a custom UI.

## Key Concepts

### What is a conversation?

A conversation is a single 'session' or 'call' with an avatar using CVI. When you create a conversation, you receive a Session link URL. This URL provides a full Real-time conversations solution, allowing you to avoid managing WebRTC or websockets. Navigating to this URL lets you chat with your avatar.

Learn more about [**creating and customizing conversations**](https://duix.com/platform/create).

### What are personas?

Personas are the 'character' or 'AI agent personality' and contain all the settings and configuration for that character or agent. For example, you can create a persona for 'Tim the Sales Agent' or 'Rob the Interviewer'. Personas let you customize CVI's layers and prompt the LLM with personality and context.

Learn more about [**creating a persona**](https://platform.duix.com/create).

### What are avatars?

An avatar is a talking-head/avatar of a human containing a voice and face clone, used as the video output layer for CVI. You can use stock avatars from DUIX or create your own with a few minutes of training data. An avatar is key for video generation and CVI.

## Getting Started

### No Code

You can easily try out CVI using the template.

### API Quick Start

Check out the [**Quick Start Guide**](https://docs.duix.com/api-reference/api/Introduction) to learn how to use the APIs to create a persona and conversation. Be sure to grab an API key first\!

Visit duix.com for more information.