import { Injectable } from "@nestjs/common";

@Injectable()
export class MessagesService{
    async getMessage({id}){
        try {
            
        } catch (error) {
            return {
                statusCode: '404',
                message: 'Message not found.'
              };
        
        }
    }
    async getMessageByCht({id}){ // why getChannelById --> delete one if it's too short
    try {
        
    } catch (error) {
        return {
            statusCode: '404',
            message: 'Message not found.'
          };
        }
    
    }
    async addMessage() {// assign createMessageDto
        try {
            return {
                statusCode: '201',
                message: 'Message created successfully.'
              };
        } catch (error) {
            return {
                statusCode: 400,
                message: error
              };
        }
    }
    async updateMessage(){
        try {
            return {
                statusCode: '200',
                message: 'Message deleted successfully.'
              };
        
        } catch (error) {
            return {
                statusCode: '404',
                message: 'Message not found.'
              };
        
        }
    }

}