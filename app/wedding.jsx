'use client';
import {useState,useEffect,useRef,useId} from 'react';
import {motion,AnimatePresence,useReducedMotion} from 'framer-motion';

const ease=[.22,.68,.18,1];
function Butterfly({seal=false}){const instance=useId().replace(/:/g,'');const wingId=`wing-${instance}`;const shadowId=`shadow-${instance}`;return <svg className={seal?'seal-butterfly':'paper-butterfly'} viewBox="0 0 200 170" aria-hidden="true"><defs><linearGradient id={wingId} x1="0" y1="0" x2="1" y2="1"><stop stopColor={seal?'#e2cb91':'#FAF7F0'}/><stop offset=".48" stopColor={seal?'#c2a269':'#eeeddd'}/><stop offset="1" stopColor={seal?'#a37d3e':'#b9c3a3'}/></linearGradient><filter id={shadowId}><feGaussianBlur stdDeviation="3"/></filter></defs>{!seal&&<ellipse cx="105" cy="140" rx="46" ry="9" fill="#5d5842" opacity=".15" filter={`url(#${shadowId})`}/>}<g className="butterfly-wing left-wing" style={{fill:`url(#${wingId})`}}><path d="M98 77C84 48 53 8 24 14 5 19 18 59 33 75 12 89 31 133 58 135 82 134 92 105 98 88Z"/><path className="wing-detail" d="M97 81 25 18M95 84 20 49M95 88 34 77M94 92 33 111M94 95 57 132M45 38Q37 62 60 75M60 49Q56 73 77 78M65 100q-9 15-6 25"/></g><g className="butterfly-wing right-wing" style={{fill:`url(#${wingId})`}}><path d="M102 77C116 48 147 8 176 14 195 19 182 59 167 75 188 89 169 133 142 135 118 134 108 105 102 88Z"/><path className="wing-detail" d="M103 81 175 18M105 84 180 49M105 88 166 77M106 92 167 111M106 95 143 132M155 38q8 24-15 37M140 49q4 24-17 29M135 100q9 15 6 25"/></g><path className="butterfly-body" d="M100 68q-3 25 0 50m-1-49L87 49m14 20 12-20"/><circle cx="100" cy="67" r="3" fill="#8d8566"/></svg>}
function Sprig({className=''}){return <svg className={className} viewBox="0 0 160 260" fill="none" aria-hidden="true"><path d="M25 251Q108 146 125 12"/>{Array.from({length:9},(_,i)=>{const y=230-i*24,x=42+i*9;return <g key={i}><path d={`M${x} ${y}q-37 -6 -32 -29q27 0 32 29q6 -33 31 -33q5 22 -31 33Z`}/><path d={`M${x-29} ${y-27}l29 27 29-30`}/></g>})}</svg>}
function Glyphs({text,className=''}){const reduced=useReducedMotion();return <motion.span className={`glyph-line ${className}`} aria-label={text} initial={reduced?false:"hidden"} animate="show" variants={{show:{transition:{staggerChildren:reduced?0:.03,delayChildren:reduced?0:.12}}}}>{Array.from(text).map((char,i)=><motion.span aria-hidden="true" key={i} variants={{hidden:{opacity:0,y:6,filter:'blur(4px)'},show:{opacity:1,y:0,filter:'blur(0px)',transition:{duration:reduced?0:.55,ease}}}}>{char===' '?'\u00a0':char}</motion.span>)}</motion.span>}
export default function Wedding({invitation}){
 const reduced=useReducedMotion();const [paperZoom,setPaperZoom]=useState({x:1,y:1});const [phase,setPhase]=useState('closed');const [scene,setScene]=useState(0);const [musicPlaying,setMusicPlaying]=useState(false);const started=useRef(false);const timers=useRef([]);const fullRef=useRef(null);const musicRef=useRef(null);
 const later=(fn,t)=>{const id=setTimeout(fn,t);timers.current.push(id)};
 useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
 useEffect(()=>{const previous=document.body.style.overflow;if(phase!=='full')document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[phase]);
 const playMusic=()=>{const audio=musicRef.current;if(!audio)return;audio.volume=.32;const playback=audio.play();if(playback?.then)playback.then(()=>setMusicPlaying(true)).catch(()=>setMusicPlaying(false));else setMusicPlaying(true)};
 const open=()=>{if(started.current)return;started.current=true;playMusic();setPaperZoom({x:window.innerWidth/Math.min(window.innerWidth*.76,350)+.01,y:window.innerHeight/Math.min(window.innerHeight*.64,600)+.01});setPhase('opening');later(()=>{setScene(1);setPhase('cinema')},reduced?50:2650)};
 const toggleMusic=()=>{const audio=musicRef.current;if(!audio)return;if(audio.paused)playMusic();else{audio.pause();setMusicPlaying(false)}};
 useEffect(()=>{if(phase!=='cinema')return;const delays=[3000,4100,3300,5200];const id=setTimeout(()=>{if(scene<3)setScene(scene+1);else setPhase('leaving')},delays[scene]);return()=>clearTimeout(id)},[phase,scene,reduced]);
 useEffect(()=>{if(phase!=='full')return;const container=fullRef.current;const form=container.querySelector('#rsvpForm');const button=form.querySelector('button[type="submit"]');
 const status=container.querySelector('#rsvpStatus');
 const success=container.querySelector('#rsvpSuccess');
 const whatsApp=container.querySelector('#rsvpWhatsApp');
 const countInput=form.querySelector('#guestCount');
 const guestNames=form.querySelector('#guestNames');
 const attendingFields=form.querySelector('#attendingFields');
 const attendanceInputs=[...form.querySelectorAll('input[name="attendance"]')];
 const renderGuests=()=>{const count=Math.max(1,Math.min(50,Number(countInput.value)||1));countInput.value=String(count);const previous=[...guestNames.querySelectorAll('input')].map(el=>el.value);guestNames.replaceChildren();for(let i=0;i<count;i++){const label=document.createElement('label');label.htmlFor='guestName'+(i+1);label.textContent='Nombre y apellido del asistente '+(i+1);const input=document.createElement('input');input.type='text';input.id=label.htmlFor;input.name='guestName'+(i+1);input.autocomplete='name';input.required=true;input.placeholder='Nombre y apellido';input.value=previous[i]||'';guestNames.append(label,input)}};
 const updateAttendance=()=>{const yes=form.querySelector('input[name="attendance"]:checked')?.value!=='no';attendingFields.hidden=!yes;countInput.required=yes;guestNames.querySelectorAll('input').forEach(input=>{input.required=yes})};
 countInput.addEventListener('change',renderGuests);
 attendanceInputs.forEach(input=>input.addEventListener('change',updateAttendance));
 updateAttendance();
 const submit=async (event)=>{
   event.preventDefault();
   if(button.disabled || !form.reportValidity())return;
   const data=new FormData(form);
   const familyName=String(data.get('familyName')||'').trim();
   const attendance=String(data.get('attendance')||'yes');
   const side=String(data.get('side')||'');
   const guestCount=attendance==='yes'?Number(countInput.value):0;
   const attendees=attendance==='yes'?[...guestNames.querySelectorAll('input')].map(el=>el.value.trim()):[];
   if(!familyName || !side || (attendance==='yes' && (attendees.length!==guestCount || attendees.some(name=>name.split(/\\s+/).length<2)))){status.textContent='Completa el nombre de la familia y el nombre y apellido de cada asistente.';return}
   button.disabled=true;
   status.textContent='Guardando tu confirmación…';
   try{
     const firstGuest=attendees[0]||familyName;
     const pieces=firstGuest.split(/\\s+/);
     const firstName=pieces.shift()||familyName;
     const lastName=pieces.join(' ')||familyName;
     const payload=new URLSearchParams({firstName,lastName,side,familyName,attendance,guestCount:String(guestCount),attendees:JSON.stringify(attendees)});
     const response=await fetch('https://script.google.com/macros/s/AKfycbwdYO_dQ83-vIcBjhtSUoPuGpO1EUSjvs0W9k5K_CIZyfqydH3fXi4q7TzHB9Yw86Bv/exec',{method:'POST',credentials:'omit',body:payload,signal:AbortSignal.timeout(20000)});
     if(!response.ok || (await response.json()).ok!==true)throw new Error('RSVP not saved');
     const message='Hola, Mayerlyn. Somos '+familyName+'. '+(attendance==='yes'?'Confirmamos '+guestCount+' persona(s) para su boda.':'Lamentablemente no podremos asistir.')+' ¡Les deseamos muchas bendiciones! 🤍';
     whatsApp.href='https://wa.me/584120705638?text='+encodeURIComponent(message);
     success.querySelector('p').textContent=attendance==='yes'?'¡Tu asistencia ha sido confirmada!':'Hemos registrado tu respuesta. ¡Gracias por avisarnos!';
     form.style.display='none';success.hidden=false;success.style.removeProperty('display');success.focus();
   }catch{status.textContent='No pudimos verificar tu confirmación. Inténtalo de nuevo.';button.disabled=false}
 };
 form.addEventListener('submit',submit);
 const update=()=>{const d=Math.max(0,new Date('2026-12-29T18:00:00-04:00')-new Date());const parts=[[Math.floor(d/864e5),'días'],[Math.floor(d%864e5/36e5),'horas'],[Math.floor(d%36e5/6e4),'min'],[Math.floor(d%6e4/1000),'seg']];container.querySelector('#countdown').innerHTML=parts.map(([n,l])=>`<div class="count-box"><b>${String(n).padStart(2,'0')}</b><small>${l}</small></div>`).join('')};update();const interval=setInterval(update,1000);
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.05});container.querySelectorAll('.card').forEach(c=>observer.observe(c));return()=>{form.removeEventListener('submit',submit);countInput.removeEventListener('change',renderGuests);attendanceInputs.forEach(input=>input.removeEventListener('change',updateAttendance));clearInterval(interval);observer.disconnect()}},[phase]);
 const opening=phase!=='closed';const showCinema=phase==='cinema';
 return <><audio ref={musicRef} src="/assets/musica-invitacion.m4a" preload="auto" loop onPause={()=>setMusicPlaying(false)} onPlay={()=>setMusicPlaying(true)} />{opening&&<button className="music-control" type="button" onClick={toggleMusic} aria-label={musicPlaying?'Pausar música':'Reproducir música'} aria-pressed={musicPlaying}><span aria-hidden="true" className="music-icon">{musicPlaying?'♫':'♪'}</span><span>{musicPlaying?'Pausar música':'Activar música'}</span></button>}<AnimatePresence onExitComplete={()=>{if(phase==='leaving')setPhase('full')}}>{phase!=='full'&&phase!=='leaving'&&<motion.section className={`cinematic-intro ${opening?'is-opening':''}`} key="intro" exit={{y:reduced?0:'-100svh',opacity:1,transition:{duration:reduced?.01:.85,ease}}} aria-label="Invitación de boda">
 <motion.div aria-hidden={opening} className="intro-heading" animate={{opacity:opening?0:1}} transition={{duration:.2}}><p>Tenemos una invitación para ti</p></motion.div>
 <motion.div className="physical-envelope" initial={false} animate={opening?{y:reduced?0:[0,0,0,-30,-260],scale:[1,.995,1,1.04,1.1],opacity:[1,1,1,1,0]}:{y:0,scale:1,opacity:1}} transition={{duration:reduced?.01:2.65,times:[0,.07,.2,.6,1],ease}} aria-hidden="true">
 <div className="envelope-back paper-grain"/>
 <div className="inner-lining"/>
 <motion.div className="envelope-letter" animate={opening?{y:[0,0,'25%','50%'],opacity:[1,1,1,0]}:{}} transition={{duration:reduced?.01:2.25,times:[0,.3,.75,1],ease}}></motion.div>
 <motion.div className="env-panel side-left paper-grain" initial={false} animate={{rotateY:opening?-128:0}} transition={{duration:reduced?.01:1.2,delay:reduced?0:.4,ease}}><Sprig/><Sprig className="second-sprig"/></motion.div><motion.div className="env-panel side-right paper-grain" initial={false} animate={{rotateY:opening?128:0}} transition={{duration:reduced?.01:1.2,delay:reduced?0:.48,ease}}><Sprig/><Sprig className="second-sprig"/></motion.div><motion.div className="env-panel bottom-panel paper-grain" initial={false} animate={{rotateX:opening?-118:0}} transition={{duration:reduced?.01:1,delay:reduced?0:.62,ease}}><Sprig/></motion.div>
 <motion.div className="env-panel top-panel paper-grain" initial={false} animate={{rotateX:opening?178:0}} transition={{duration:reduced?.01:.95,delay:reduced?0:.55,ease}}><Sprig/><Sprig className="second-sprig"/></motion.div>
 <motion.div className="wax-seal" animate={opening?{opacity:[1,1,0],scale:[1,1.24,1.12],y:[0,-18,58],x:[0,7,24],rotate:[0,-7,16]}:{opacity:1,scale:1,y:0,x:0,rotate:0}} transition={{duration:reduced?.01:.7,times:[0,.4,1],ease}}><img src="/assets/wax-seal-mm-cursive.png" alt="" width="140" height="130"/></motion.div>
 </motion.div>
 <motion.div className="emerging-paper paper-grain" initial={false} style={{width:'min(76vw,350px)',height:'min(64svh,600px)'}} animate={opening?{opacity:[0,1,1,1,1],scaleX:[1,1,1,paperZoom.x,paperZoom.x],scaleY:[1,1,1,paperZoom.y,paperZoom.y],y:['-50%','-40%','-12%','-50%','-50%']}:{opacity:0,scaleX:1,scaleY:1}} transition={{duration:reduced?.01:2.65,times:[0,.25,.6,.98,1],ease}}/>
 {!opening&&<button className="envelope-touch" onClick={open} aria-label="Abrir el sobre de la invitación"><span>Toca el sello para abrir</span></button>}
 <AnimatePresence>{showCinema&&<motion.div key="cinema" className="cinema-content" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.25}}>
 <motion.div className="butterfly-anchor" initial={{opacity:0,y:18,scale:.7}} animate={{opacity:1,y:0,scale:1}} transition={{duration:reduced?.01:.85,ease}}><div className="flutter-flight flight-one"><Butterfly/></div></motion.div>
 <motion.div className="butterfly-anchor butterfly-companion" initial={{opacity:0,y:12,scale:.7}} animate={{opacity:1,y:0,scale:1}} transition={{duration:reduced?.01:.9,delay:reduced?0:.15,ease}}><div className="flutter-flight flight-two"><Butterfly/></div></motion.div>
 <div className="scene-stage" aria-live="polite"><AnimatePresence mode="wait"><motion.div className={`scene scene-${scene}`} key={scene} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,filter:reduced?'none':'blur(2px)',transition:{duration:reduced?0:.3}}} transition={{duration:reduced?0:.25}}>
 {scene===0&&<><Glyphs text="Con la bendición de Dios" className="editorial-intro"/><span className="small-rule"/><Glyphs text="Te invitamos a nuestra boda" className="editorial-sub"/></>}
 {scene===1&&<><p className="cinema-kicker">Nos casamos</p><Glyphs text="Mayerlyn" className="calligraphy names"/><Glyphs text="&" className="calligraphy ampersand"/><Glyphs text="Miguel" className="calligraphy names"/></>}
 {scene===2&&<><Glyphs text="Guarda" className="calligraphy save"/><Glyphs text="la fecha" className="calligraphy save"/></>}
 {scene===3&&<><Glyphs text="29 de diciembre" className="final-date"/><Glyphs text="2026" className="year"/><span className="small-rule"/><p className="ceremony-info">6:00 p. m. · Ceremonia religiosa<br/><span>Iglesia Nuestra Señora del Carmen</span></p><p className="ceremony-info reception">8:00 p. m. · Recepción<br/><span>Posada Doña Juana · El Morichal</span></p></>}
 </motion.div></AnimatePresence></div>
 <button className="skip-cinema" onClick={()=>setPhase('leaving')}>{scene===3?'Ver invitación completa':'Ir a la invitación'} <span aria-hidden="true">↓</span></button>
 </motion.div>}</AnimatePresence>
 </motion.section>}</AnimatePresence>
 {(phase==='leaving'||phase==='full')&&<motion.main key="full" ref={fullRef} className="wedding-full" initial={{y:reduced?0:"100svh",opacity:1}} animate={{y:0,opacity:1}} transition={{duration:reduced?0:.85,ease}}><div dangerouslySetInnerHTML={{__html:invitation}}/></motion.main>}
 </>
}
