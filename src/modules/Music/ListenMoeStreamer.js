import fetch from 'node-fetch'
import { RichEmbed } from 'discord.js';
import EventEmitter from 'events';
import WebSocket from 'ws';

export default class ListenMoeStreamer extends EventEmitter {
  static isValid(url)
  {
      return url.startsWith('https://listen.moe');
  }

  constructor(adder, url) {
    super();
    this.adder = adder;
    this.url = url;
    const ws = new WebSocket('wss://listen.moe/api/v2/socket');
    
    ws.on('message',(data) =>{
      if (!data)
        return;
      try {
        const parsed = JSON.parse(data);
        if (parsed.song_name) {
          this.infos = parsed;
          this.emit('music');
        }
      } catch (e) {
        console.error(e)
      }
    });
  }
  get stream()
  {
    return fetch(`https://listen.moe/stream`)
      .then(res => res.body)
  }

  get embed()
  {
    if (this.infos) {
      return Promise.resolve(new RichEmbed()
        .setTitle(`${this.infos.artist_name} - ${this.infos.song_name}`)
        .setImage('https://listen.moe/files/images/kanna.gif')
        .setFooter(`Requested by ${this.infos.requested_by || 'anonymous'} - ${this.infos.listeners} auditeurs`)
      )
    } else
      return Promise.resolve(new RichEmbed()
        .setTitle('Listen.moe')
        .setImage('http://listen.moe/files/images/fb_share.jpg')
      )
  }

  get title()
  {
    if (this.infos) {
      return Promise.resolve(`${this.infos.artist_name} - ${this.infos.song_name}`);
    } else {
      return Promise.resolve('Listen.moe');
    }
  }
}
