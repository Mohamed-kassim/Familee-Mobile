import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from 'axios'
export default class chat extends Component {
    state = {
        messages: [],
      }


      componentDidMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Welcome to our bot system',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Chat Bot',
                avatar: 'https://cdn.discordapp.com/attachments/652663091992985628/652731902402494492/familee.png',
              },
            },
          ],
        })
      }
      onSend(messages = []) {
        console.log(messages)
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
          }))
        axios.post('https://1a686b4e.ngrok.io', {
            msg: messages[0].text
          })
          .then( (response) =>{
            console.log(response.data); 
            const messages =  [
                {
                  _id: this.state.messages.length+1,
                  text: response.data,
                  createdAt: new Date(),
                  user: {
                    _id: 2,
                    name: 'Chat Bot',
                    avatar: 'https://cdn.discordapp.com/attachments/652663091992985628/652731902402494492/familee.png',
                  },
                },
              ]
              this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
              }))
          })
          .catch(function (error) {
            console.log(error);
            console.log(error.response);
          });
       
      }
    
    render() {
        return (
            <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        )
    }
}

const styles = StyleSheet.create({})
