const a4_0xf7d21e=a4_0x5562;(function(_0xee99ba,_0x53f1d8){const _0xdf7817=a4_0x5562,_0x473788=_0xee99ba();while(!![]){try{const _0x399b3d=-parseInt(_0xdf7817(0x1f1))/0x1+-parseInt(_0xdf7817(0x217))/0x2+-parseInt(_0xdf7817(0x228))/0x3+-parseInt(_0xdf7817(0x1fa))/0x4*(-parseInt(_0xdf7817(0x1f0))/0x5)+parseInt(_0xdf7817(0x212))/0x6+parseInt(_0xdf7817(0x20d))/0x7*(-parseInt(_0xdf7817(0x244))/0x8)+parseInt(_0xdf7817(0x23e))/0x9;if(_0x399b3d===_0x53f1d8)break;else _0x473788['push'](_0x473788['shift']());}catch(_0x24a672){_0x473788['push'](_0x473788['shift']());}}}(a4_0x4ef9,0xa6bb0));import{playMessageSound,playChoiceSound,playThreeClickSound,playTextSound,stopTextSound,playToggleSound}from'./audio.js';function a4_0x5562(_0x2c049f,_0x3b1d79){const _0x4ef941=a4_0x4ef9();return a4_0x5562=function(_0x55624a,_0x34d7b7){_0x55624a=_0x55624a-0x1ee;let _0x4e16b4=_0x4ef941[_0x55624a];return _0x4e16b4;},a4_0x5562(_0x2c049f,_0x3b1d79);}let interval,playing,allListeners=[];const availableGames=[a4_0xf7d21e(0x203),a4_0xf7d21e(0x219)];function addListener(_0x4ef49d,_0x2d9f14){const _0x155746=a4_0xf7d21e;document[_0x155746(0x238)](_0x4ef49d,_0x2d9f14),allListeners[_0x155746(0x22c)]({'eventType':_0x4ef49d,'callback':_0x2d9f14});}function a4_0x4ef9(){const _0x51ca8e=['keyup','clientX','Left','snakeCanvas','Lives:\x20','contains','fill','15px\x20Arial','3395817nANYMF','removeEventListener','canvas-wrapper','createElement','push','#dc09a1','innerWidth','modal','teal','unshift','visible','use\x20arrows\x20on\x20a\x20keyboard','callback','darkgray','appendChild','lightgray','addEventListener','clearRect','white','display','Right','key','6934311GZFJoW','querySelector','onclick','beginPath','abs','keydown','14856ffQPWM','30px\x20Arial','rowCount','some','ArrowRight','getElementsByClassName','close','offsetLeft','orange','20px\x20Arial','touches','swipe\x20up\x20left\x20right\x20down','arc','black','slice','red','block','touchstart','offsetTop','font','5VLRjkU','224524CRGEjq','columnCount','removeChild','width','Well\x20Done','final\x20score:\x20','height','classList','ArrowUp','5356216PVJffl','body','closePath','style','touchmove','clientY','fillText','padding','getContext','snake','radius','#888','fillRect','SNAKE','ArrowLeft','tier\x20','log','dark-mode','getElementById','917UtwthC','your\x20score:\x20','fillStyle','50px\x20Arial','random','1980432PsoCYf','floor','className','GAME\x20OVER','div','313894AWwOQp','touchend','breakout','40px\x20Arial','speed','eventType','length','resize','Score:\x20'];a4_0x4ef9=function(){return _0x51ca8e;};return a4_0x4ef9();}function openMiniGame(_0x49f624='snake'){const _0x3c3912=a4_0xf7d21e,_0x4aeba9=document[_0x3c3912(0x20c)](_0x3c3912(0x22f));_0x4aeba9[_0x3c3912(0x1fd)][_0x3c3912(0x23b)]=_0x3c3912(0x254);const _0x7b3831=document[_0x3c3912(0x23f)]('.modal-content'),_0xe425e6=document['createElement']('canvas');_0xe425e6['id']=_0x3c3912(0x223);const _0x29e083=document[_0x3c3912(0x22b)]('div');_0x29e083[_0x3c3912(0x214)]=_0x3c3912(0x22a),_0x29e083[_0x3c3912(0x236)](_0xe425e6);const _0x361d6a=document[_0x3c3912(0x22b)](_0x3c3912(0x216));_0x361d6a['id']='gameMessage',_0x7b3831[_0x3c3912(0x236)](_0x29e083);const _0x3c6655=document[_0x3c3912(0x249)](_0x3c3912(0x24a))[0x0];playing=!![];let _0x4f0630;if(_0x49f624==='snake')_0x4f0630=()=>resizeSnake(_0xe425e6,_0x361d6a);else(_0x49f624=_0x3c3912(0x219))?_0x4f0630=()=>resizeBreak(_0xe425e6,_0x361d6a):_0x4f0630=()=>resizeSnake(_0xe425e6,_0x361d6a);_0x4f0630(),window['addEventListener'](_0x3c3912(0x21e),_0x4f0630),_0x3c6655[_0x3c3912(0x240)]=_0x2cb947,window[_0x3c3912(0x240)]=_0x5c186a=>{_0x5c186a['target']===_0x4aeba9&&_0x2cb947();};function _0x2cb947(){const _0x13cc65=_0x3c3912;playing=![],clearInterval(interval),window[_0x13cc65(0x229)]('resize',_0x4f0630);for(let _0x18b7a6=0x0;_0x18b7a6<allListeners[_0x13cc65(0x21d)];_0x18b7a6++){document[_0x13cc65(0x229)](allListeners[_0x18b7a6][_0x13cc65(0x21c)],allListeners[_0x18b7a6][_0x13cc65(0x234)]);}stopTextSound(),allListeners=[],_0x7b3831[_0x13cc65(0x1f3)](_0x29e083),_0x4aeba9[_0x13cc65(0x1fd)][_0x13cc65(0x23b)]='none';}}function resizeSnake(_0x150c8b,_0x29c4a8){const _0x160709=a4_0xf7d21e;if(!playing)return;console[_0x160709(0x20a)]('Game\x20starts');const _0x408fc8=document[_0x160709(0x1fb)][_0x160709(0x1f8)][_0x160709(0x225)](_0x160709(0x20b));let _0x130964=window[_0x160709(0x22e)]>=0x2bc?0x1:0x2;_0x130964===0x1?(_0x150c8b[_0x160709(0x1f4)]=0x1e0,_0x150c8b[_0x160709(0x1f7)]=0x1e0):(_0x150c8b[_0x160709(0x1f4)]=0x12c,_0x150c8b[_0x160709(0x1f7)]=0x12c);let _0x49f70f=0x0;interval&&clearInterval(interval);const _0x3fc70a=_0x150c8b[_0x160709(0x202)]('2d');let _0x1fa17b=[{'x':0xa,'y':0xa}],_0x156a8d={'x':0x0,'y':0x0},_0x19266a=_0x130964==0x1?0x14:0xa,_0x4fe4ba={'w':Math[_0x160709(0x213)](_0x150c8b[_0x160709(0x1f4)]/_0x19266a),'h':Math[_0x160709(0x213)](_0x150c8b[_0x160709(0x1f7)]/_0x19266a)};console[_0x160709(0x20a)]('width:\x20'+_0x4fe4ba+'\x20height:'+_0x4fe4ba);let _0x4dd6a9={'x':Math[_0x160709(0x213)](Math[_0x160709(0x211)]()*(_0x4fe4ba['w']-0x1))+0x1,'y':Math[_0x160709(0x213)](Math['random']()*(_0x4fe4ba['h']-0x1))-0x1},_0x2630ab=![];function _0x22ffd7(){const _0x3e2a61=_0x160709,_0x3c1ed3={'x':_0x1fa17b[0x0]['x']+_0x156a8d['x'],'y':_0x1fa17b[0x0]['y']+_0x156a8d['y']};_0x1fa17b[_0x3e2a61(0x231)](_0x3c1ed3);if(_0x3c1ed3['x']===_0x4dd6a9['x']&&_0x3c1ed3['y']===_0x4dd6a9['y'])_0x49f70f+=0xa,_0x4dd6a9={'x':Math[_0x3e2a61(0x213)](Math['random']()*(_0x4fe4ba['w']-0x1))+0x1,'y':Math[_0x3e2a61(0x213)](Math[_0x3e2a61(0x211)]()*(_0x4fe4ba['h']-0x1))+0x1},playChoiceSound();else{_0x1fa17b['pop']();if(_0x156a8d['y']===0x0&&_0x156a8d['y']===0x0){}else playTextSound();}(_0x3c1ed3['x']<0x0||_0x3c1ed3['x']>=_0x4fe4ba['w']||_0x3c1ed3['y']<0x0||_0x3c1ed3['y']>=_0x4fe4ba['h']||_0x1fa17b[_0x3e2a61(0x252)](0x1)[_0x3e2a61(0x247)](_0x196b7e=>_0x196b7e['x']===_0x3c1ed3['x']&&_0x196b7e['y']===_0x3c1ed3['y']))&&(_0x2630ab=!![],playMessageSound());_0x3fc70a[_0x3e2a61(0x239)](0x0,0x0,_0x150c8b['width'],_0x150c8b['height']),_0x3fc70a['fillStyle']=_0x408fc8?_0x3e2a61(0x251):_0x3e2a61(0x23a),_0x3fc70a[_0x3e2a61(0x206)](0x0,0x0,_0x4fe4ba['w']*_0x19266a,_0x4fe4ba['h']*_0x19266a);_0x130964===0x1?(_0x3fc70a['fillStyle']=_0x3e2a61(0x230),_0x3fc70a[_0x3e2a61(0x1ef)]=_0x3e2a61(0x21a),_0x3fc70a[_0x3e2a61(0x200)](_0x3e2a61(0x207),_0x19266a,0x32),_0x3fc70a['fillStyle']=_0x3e2a61(0x253),_0x3fc70a['font']=_0x3e2a61(0x245),_0x3fc70a[_0x3e2a61(0x200)](''+_0x49f70f,_0x4fe4ba['w']*_0x19266a-0x4*_0x19266a,0x28),_0x3fc70a[_0x3e2a61(0x20f)]=_0x408fc8?_0x3e2a61(0x235):_0x3e2a61(0x237),_0x3fc70a[_0x3e2a61(0x1ef)]=_0x3e2a61(0x24d),_0x3fc70a[_0x3e2a61(0x200)]('use\x20arrows\x20on\x20a\x20keyboard',_0x19266a,0x50),_0x3fc70a[_0x3e2a61(0x200)](_0x3e2a61(0x24f),_0x19266a,0x64)):(_0x3fc70a[_0x3e2a61(0x20f)]=_0x3e2a61(0x230),_0x3fc70a[_0x3e2a61(0x1ef)]=_0x3e2a61(0x24d),_0x3fc70a['fillText'](_0x3e2a61(0x207),_0x19266a,0x14),_0x3fc70a[_0x3e2a61(0x20f)]=_0x3e2a61(0x253),_0x3fc70a[_0x3e2a61(0x1ef)]=_0x3e2a61(0x227),_0x3fc70a[_0x3e2a61(0x200)](''+_0x49f70f,_0x4fe4ba['w']*_0x19266a-0x4*_0x19266a,0x11),_0x3fc70a[_0x3e2a61(0x20f)]=_0x408fc8?_0x3e2a61(0x235):_0x3e2a61(0x237),_0x3fc70a['font']=_0x3e2a61(0x227),_0x3fc70a['fillText'](_0x3e2a61(0x233),_0x19266a,0x28),_0x3fc70a['fillText'](_0x3e2a61(0x24f),_0x19266a,0x37));_0x3fc70a['fillStyle']=_0x3e2a61(0x24c);for(let _0x2c6e83=0x0;_0x2c6e83<_0x1fa17b[_0x3e2a61(0x21d)];_0x2c6e83++){_0x2c6e83===0x0?!_0x2630ab&&_0x3fc70a[_0x3e2a61(0x206)](_0x1fa17b[_0x2c6e83]['x']*_0x19266a,_0x1fa17b[_0x2c6e83]['y']*_0x19266a,_0x19266a,_0x19266a):_0x3fc70a['fillRect'](_0x1fa17b[_0x2c6e83]['x']*_0x19266a,_0x1fa17b[_0x2c6e83]['y']*_0x19266a,_0x19266a,_0x19266a);}_0x3fc70a[_0x3e2a61(0x20f)]=_0x408fc8?_0x3e2a61(0x22d):_0x3e2a61(0x230),_0x3fc70a[_0x3e2a61(0x206)](_0x4dd6a9['x']*_0x19266a,_0x4dd6a9['y']*_0x19266a,_0x19266a,_0x19266a),_0x2630ab&&(_0x130964===0x1?(_0x3fc70a[_0x3e2a61(0x20f)]=_0x3e2a61(0x230),_0x3fc70a[_0x3e2a61(0x1ef)]=_0x3e2a61(0x210),_0x3fc70a[_0x3e2a61(0x200)](_0x3e2a61(0x215),_0x4fe4ba['w']*_0x19266a/0x6,_0x4fe4ba['h']*_0x19266a-0x64),_0x3fc70a[_0x3e2a61(0x20f)]=_0x3e2a61(0x253),_0x3fc70a[_0x3e2a61(0x1ef)]='30px\x20Arial',_0x3fc70a['fillText'](_0x3e2a61(0x20e)+_0x49f70f,_0x4fe4ba['w']*_0x19266a/0x4,_0x4fe4ba['h']*_0x19266a-0x32)):(_0x3fc70a['fillStyle']='teal',_0x3fc70a[_0x3e2a61(0x1ef)]=_0x3e2a61(0x245),_0x3fc70a[_0x3e2a61(0x200)]('GAME\x20OVER',_0x4fe4ba['w']*_0x19266a/0x6,_0x4fe4ba['h']*_0x19266a-0x28),_0x3fc70a[_0x3e2a61(0x20f)]=_0x3e2a61(0x253),_0x3fc70a['font']='20px\x20Arial',_0x3fc70a[_0x3e2a61(0x200)](_0x3e2a61(0x20e)+_0x49f70f,_0x4fe4ba['w']*_0x19266a/0x4+0xa,_0x4fe4ba['h']*_0x19266a-0x14)),clearInterval(interval));}let _0x215614=0x0,_0x181741=0x0;function _0x2ba52f(_0x517b5d){const _0x14ec70=_0x160709,_0x1c22b7=_0x517b5d[_0x14ec70(0x24e)][0x0];_0x215614=_0x1c22b7['clientX'],_0x181741=_0x1c22b7[_0x14ec70(0x1ff)];}function _0x1be695(_0x5fa1ef){const _0x484e6b=_0x160709;if(!_0x215614||!_0x181741)return;const _0x7c17a8=_0x5fa1ef[_0x484e6b(0x24e)][0x0],_0x44308b=_0x7c17a8[_0x484e6b(0x221)],_0x2c0c5b=_0x7c17a8[_0x484e6b(0x1ff)],_0x36e64f=_0x44308b-_0x215614,_0x37258d=_0x2c0c5b-_0x181741;if(Math[_0x484e6b(0x242)](_0x36e64f)>Math[_0x484e6b(0x242)](_0x37258d)){if(_0x36e64f>0x0&&_0x156a8d['x']===0x0)_0x156a8d={'x':0x1,'y':0x0};else _0x36e64f<0x0&&_0x156a8d['x']===0x0&&(_0x156a8d={'x':-0x1,'y':0x0});}else{if(_0x37258d>0x0&&_0x156a8d['y']===0x0)_0x156a8d={'x':0x0,'y':0x1};else _0x37258d<0x0&&_0x156a8d['y']===0x0&&(_0x156a8d={'x':0x0,'y':-0x1});}_0x215614=0x0,_0x181741=0x0;}addListener(_0x160709(0x1fe),_0x1be695),addListener(_0x160709(0x255),_0x2ba52f),window['onkeydown']=_0x50ac0a=>{const _0x3066e8=_0x160709;switch(_0x50ac0a[_0x3066e8(0x23d)]){case _0x3066e8(0x1f9):if(_0x156a8d['y']===0x0)_0x156a8d={'x':0x0,'y':-0x1};break;case'ArrowDown':if(_0x156a8d['y']===0x0)_0x156a8d={'x':0x0,'y':0x1};break;case'ArrowLeft':if(_0x156a8d['x']===0x0)_0x156a8d={'x':-0x1,'y':0x0};break;case _0x3066e8(0x248):if(_0x156a8d['x']===0x0)_0x156a8d={'x':0x1,'y':0x0};break;}},interval=setInterval(_0x22ffd7,0x64);}function resizeBreak(_0x242a13,_0x42199b){const _0x1ed75c=a4_0xf7d21e;if(!playing)return;console[_0x1ed75c(0x20a)]('Game\x20starts');const _0x465c0c=document[_0x1ed75c(0x1fb)][_0x1ed75c(0x1f8)][_0x1ed75c(0x225)](_0x1ed75c(0x20b));let _0x2a83b7=window[_0x1ed75c(0x22e)]>=0x2bc?0x1:0x2;_0x2a83b7===0x1?(_0x242a13[_0x1ed75c(0x1f4)]=0x1e0,_0x242a13['height']=0x1e0):(_0x242a13[_0x1ed75c(0x1f4)]=0x12c,_0x242a13['height']=0x12c);console[_0x1ed75c(0x20a)](_0x242a13[_0x1ed75c(0x1f4)]+(_0x1ed75c(0x209)+_0x2a83b7));let _0x12279a=0x0,_0x588b06=0x3;interval&&clearInterval(interval);const _0x103990=_0x242a13[_0x1ed75c(0x202)]('2d');let _0x15184b=![],_0x14e0c9={'width':_0x2a83b7===0x2?0x2d:0x5a,'height':_0x2a83b7===0x2?0xa:0x14,'x':_0x242a13[_0x1ed75c(0x1f4)]/0x2-0x32,'y':_0x2a83b7===0x2?_0x242a13[_0x1ed75c(0x1f7)]-0x14:_0x242a13[_0x1ed75c(0x1f7)]-0x28,'speed':0x7,'dx':0x0},_0x430be3={'x':_0x242a13['width']/0x2,'y':_0x242a13[_0x1ed75c(0x1f7)]-0x28,'radius':_0x2a83b7===0x2?0x5:0xa,'speed':_0x2a83b7===0x2?0x3:0x5,'dx':_0x2a83b7===0x2?0x3:0x5,'dy':_0x2a83b7===0x2?-0x3:-0x5};const _0x39afa9={'rowCount':0x5,'columnCount':_0x2a83b7===0x2?0x8:0x6,'width':_0x2a83b7===0x2?0x1e:0x3c,'height':_0x2a83b7===0x2?0xa:0x14,'padding':_0x2a83b7===0x2?0x6:0xa,'offsetTop':_0x2a83b7===0x2?0x1e:0x28,'offsetLeft':_0x2a83b7===0x2?0x8:0x23};let _0x499667=0x0,_0x2a5c55=0x0,_0x950e99=0x0,_0x5cf61d=[];for(let _0x21aa3c=0x0;_0x21aa3c<_0x39afa9[_0x1ed75c(0x1f2)];_0x21aa3c++){_0x5cf61d[_0x21aa3c]=[];for(let _0x27b23d=0x0;_0x27b23d<_0x39afa9['rowCount'];_0x27b23d++){_0x5cf61d[_0x21aa3c][_0x27b23d]={'x':0x0,'y':0x0,'visible':!![]};}}function _0x256b0d(){const _0x56bb26=_0x1ed75c;_0x103990[_0x56bb26(0x20f)]=_0x465c0c?_0x56bb26(0x24c):_0x56bb26(0x24c),_0x103990['fillRect'](_0x14e0c9['x'],_0x14e0c9['y'],_0x14e0c9[_0x56bb26(0x1f4)],_0x14e0c9['height']);}function _0x31dc77(){const _0x9a5de2=_0x1ed75c;_0x103990[_0x9a5de2(0x241)](),_0x103990[_0x9a5de2(0x250)](_0x430be3['x'],_0x430be3['y'],_0x430be3[_0x9a5de2(0x204)],0x0,Math['PI']*0x2),_0x103990['fillStyle']=_0x465c0c?'white':_0x9a5de2(0x23a),_0x103990[_0x9a5de2(0x226)](),_0x103990[_0x9a5de2(0x1fc)]();}function _0x18ec58(){const _0x5e9c59=_0x1ed75c;for(let _0xef0790=0x0;_0xef0790<_0x39afa9[_0x5e9c59(0x1f2)];_0xef0790++){for(let _0x364a96=0x0;_0x364a96<_0x39afa9[_0x5e9c59(0x246)];_0x364a96++){if(_0x5cf61d[_0xef0790][_0x364a96]['visible']){const _0x35ab3d=_0xef0790*(_0x39afa9[_0x5e9c59(0x1f4)]+_0x39afa9['padding'])+_0x39afa9[_0x5e9c59(0x24b)],_0x3edc84=_0x364a96*(_0x39afa9[_0x5e9c59(0x1f7)]+_0x39afa9[_0x5e9c59(0x201)])+_0x39afa9[_0x5e9c59(0x1ee)];_0x5cf61d[_0xef0790][_0x364a96]['x']=_0x35ab3d,_0x5cf61d[_0xef0790][_0x364a96]['y']=_0x3edc84,_0x103990['fillStyle']=_0x465c0c?_0x5e9c59(0x205):_0x5e9c59(0x23a),_0x103990['fillRect'](_0x35ab3d,_0x3edc84,_0x39afa9[_0x5e9c59(0x1f4)],_0x39afa9[_0x5e9c59(0x1f7)]);}}}}function _0x53e58a(){const _0x3e96d9=_0x1ed75c;_0x103990['clearRect'](0x0,0x0,_0x242a13[_0x3e96d9(0x1f4)],_0x242a13[_0x3e96d9(0x1f7)]),_0x31dc77(),_0x256b0d(),_0x18ec58();if(_0x15184b){_0x103990[_0x3e96d9(0x20f)]=_0x3e96d9(0x230);if(_0x588b06===0x0){const _0x18cbc0=(_0x2a5c55+_0x950e99)*0x5,_0x41d88c=_0x588b06>0x1?_0x12279a*_0x588b06-_0x18cbc0:_0x12279a;_0x2a83b7===0x2?(_0x103990[_0x3e96d9(0x1ef)]=_0x3e96d9(0x245),_0x103990[_0x3e96d9(0x200)](_0x3e96d9(0x1f5),_0x242a13['width']/0x4,_0x242a13[_0x3e96d9(0x1f7)]-0x64),_0x103990[_0x3e96d9(0x20f)]='red',_0x103990[_0x3e96d9(0x1ef)]=_0x3e96d9(0x227),_0x103990[_0x3e96d9(0x200)](_0x3e96d9(0x1f6)+_0x41d88c,_0x242a13['width']/0x4+0x14,_0x242a13[_0x3e96d9(0x1f7)]-0x32)):(_0x103990['font']=_0x3e96d9(0x210),_0x103990[_0x3e96d9(0x200)](_0x3e96d9(0x1f5),_0x242a13[_0x3e96d9(0x1f4)]/0x4,_0x242a13[_0x3e96d9(0x1f7)]-0x64),_0x103990[_0x3e96d9(0x20f)]=_0x3e96d9(0x253),_0x103990[_0x3e96d9(0x1ef)]=_0x3e96d9(0x245),_0x103990[_0x3e96d9(0x200)]('final\x20score:\x20'+_0x41d88c,_0x242a13['width']/0x4+0x14,_0x242a13[_0x3e96d9(0x1f7)]-0x32)),clearInterval(interval);}else _0x2a83b7===0x2?(_0x103990[_0x3e96d9(0x1ef)]=_0x3e96d9(0x245),_0x103990[_0x3e96d9(0x200)]('GAME\x20OVER',_0x242a13[_0x3e96d9(0x1f4)]/0x6+0x5,_0x242a13[_0x3e96d9(0x1f7)]-0x64),_0x103990['fillStyle']=_0x3e96d9(0x253),_0x103990['font']=_0x3e96d9(0x227),_0x103990['fillText'](_0x3e96d9(0x20e)+_0x12279a,_0x242a13[_0x3e96d9(0x1f4)]/0x4+0xf,_0x242a13[_0x3e96d9(0x1f7)]-0x32)):(_0x103990['font']=_0x3e96d9(0x210),_0x103990['fillText'](_0x3e96d9(0x215),_0x242a13['width']/0x6+0x5,_0x242a13['height']-0x64),_0x103990[_0x3e96d9(0x20f)]=_0x3e96d9(0x253),_0x103990[_0x3e96d9(0x1ef)]='30px\x20Arial',_0x103990[_0x3e96d9(0x200)](_0x3e96d9(0x20e)+_0x12279a,_0x242a13['width']/0x4+0xf,_0x242a13[_0x3e96d9(0x1f7)]-0x32)),clearInterval(interval);}else _0x2a83b7===0x2?(_0x103990[_0x3e96d9(0x20f)]=_0x3e96d9(0x253),_0x103990[_0x3e96d9(0x1ef)]=_0x3e96d9(0x227),_0x103990[_0x3e96d9(0x200)](_0x3e96d9(0x21f)+_0x12279a,0x14,0x14),_0x103990[_0x3e96d9(0x200)]('Lives:\x20'+_0x588b06,_0x242a13[_0x3e96d9(0x1f4)]-0x50,0x14)):(_0x103990[_0x3e96d9(0x20f)]='red',_0x103990['font']=_0x3e96d9(0x24d),_0x103990[_0x3e96d9(0x200)](_0x3e96d9(0x21f)+_0x12279a,0x14,0x1e),_0x103990[_0x3e96d9(0x200)](_0x3e96d9(0x224)+_0x588b06,_0x242a13[_0x3e96d9(0x1f4)]-0x50,0x1e));}function _0x150f7e(){const _0x452742=_0x1ed75c;_0x14e0c9['x']+=_0x14e0c9['dx'];if(_0x14e0c9['x']<0x0)_0x14e0c9['x']=0x0;else _0x14e0c9['x']+_0x14e0c9['width']>_0x242a13[_0x452742(0x1f4)]&&(_0x14e0c9['x']=_0x242a13['width']-_0x14e0c9[_0x452742(0x1f4)]);}function _0x4e15d4(){const _0x512511=_0x1ed75c;_0x430be3['x']+=_0x430be3['dx'],_0x430be3['y']+=_0x430be3['dy'];(_0x430be3['x']+_0x430be3[_0x512511(0x204)]>_0x242a13['width']||_0x430be3['x']-_0x430be3[_0x512511(0x204)]<0x0)&&(_0x430be3['dx']*=-0x1,playToggleSound(),_0x2a5c55++);_0x430be3['y']-_0x430be3[_0x512511(0x204)]<0x0&&(_0x430be3['dy']*=-0x1,playToggleSound(),_0x2a5c55++);_0x430be3['x']>_0x14e0c9['x']&&_0x430be3['x']<_0x14e0c9['x']+_0x14e0c9[_0x512511(0x1f4)]&&_0x430be3['y']+_0x430be3[_0x512511(0x204)]>_0x14e0c9['y']&&(_0x430be3['dy']=-_0x430be3[_0x512511(0x21b)],playChoiceSound(),_0x950e99++);for(let _0xbb3cef=0x0;_0xbb3cef<_0x39afa9[_0x512511(0x1f2)];_0xbb3cef++){for(let _0x51b5c4=0x0;_0x51b5c4<_0x39afa9[_0x512511(0x246)];_0x51b5c4++){const _0x360def=_0x5cf61d[_0xbb3cef][_0x51b5c4];_0x360def[_0x512511(0x232)]&&(_0x430be3['x']>_0x360def['x']&&_0x430be3['x']<_0x360def['x']+_0x39afa9['width']&&_0x430be3['y']-_0x430be3['radius']>_0x360def['y']&&_0x430be3['y']-_0x430be3[_0x512511(0x204)]<_0x360def['y']+_0x39afa9[_0x512511(0x1f7)]&&(_0x430be3['dy']*=-0x1,_0x360def[_0x512511(0x232)]=![],_0x12279a+=0xa,playThreeClickSound(),_0x499667++,_0x499667>=_0x39afa9[_0x512511(0x1f2)]*_0x39afa9[_0x512511(0x246)]&&(_0x15184b=!![])));}}_0x430be3['y']+_0x430be3['radius']>_0x242a13[_0x512511(0x1f7)]&&(_0x588b06--,playMessageSound(),_0x588b06===0x0?_0x15184b=!![]:(_0x430be3['x']=_0x242a13[_0x512511(0x1f4)]/0x2,_0x430be3['y']=_0x242a13[_0x512511(0x1f7)]-0x28,_0x430be3['dx']=_0x2a83b7===0x2?0x3:0x5,_0x430be3['dy']=_0x2a83b7===0x2?-0x3:-0x5,_0x14e0c9['x']=_0x242a13[_0x512511(0x1f4)]/0x2-_0x14e0c9['width']/0x2));}function _0x1349b5(){_0x150f7e(),_0x4e15d4(),_0x53e58a();}let _0x62561f=null;function _0x3af7d6(_0x23982d){const _0x56de8d=_0x1ed75c;if(_0x23982d['key']===_0x56de8d(0x248)||_0x23982d[_0x56de8d(0x23d)]===_0x56de8d(0x23c))_0x14e0c9['dx']=_0x14e0c9[_0x56de8d(0x21b)];else(_0x23982d[_0x56de8d(0x23d)]===_0x56de8d(0x208)||_0x23982d[_0x56de8d(0x23d)]===_0x56de8d(0x222))&&(_0x14e0c9['dx']=-_0x14e0c9[_0x56de8d(0x21b)]);}function _0x10fbe2(_0x145063){const _0x5913dc=_0x1ed75c;(_0x145063[_0x5913dc(0x23d)]===_0x5913dc(0x248)||_0x145063[_0x5913dc(0x23d)]===_0x5913dc(0x23c)||_0x145063[_0x5913dc(0x23d)]===_0x5913dc(0x208)||_0x145063[_0x5913dc(0x23d)]===_0x5913dc(0x222))&&(_0x14e0c9['dx']=0x0);}function _0x5b314e(_0x528ac9){const _0x46b6e5=_0x1ed75c;_0x62561f=_0x528ac9[_0x46b6e5(0x24e)][0x0][_0x46b6e5(0x221)];}function _0xba50c5(_0x4839fa){const _0x57e511=_0x1ed75c;if(_0x62561f!==null){const _0x4edfcf=_0x4839fa[_0x57e511(0x24e)][0x0][_0x57e511(0x221)],_0x4bf310=_0x4edfcf-_0x62561f;if(_0x4bf310>0x0)_0x14e0c9['dx']=_0x14e0c9[_0x57e511(0x21b)];else _0x4bf310<0x0&&(_0x14e0c9['dx']=-_0x14e0c9['speed']);}}function _0x9a0430(_0x40316f){_0x14e0c9['dx']=0x0,_0x62561f=null;}addListener(_0x1ed75c(0x1fe),_0xba50c5),addListener(_0x1ed75c(0x255),_0x5b314e),addListener(_0x1ed75c(0x218),_0x9a0430),addListener(_0x1ed75c(0x243),_0x3af7d6),addListener(_0x1ed75c(0x220),_0x10fbe2),interval=setInterval(_0x1349b5,0x3e8/0x3c);}export{openMiniGame,availableGames};