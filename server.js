const express=require('express'),fs=require('fs'),path=require('path');
const app=express(),PORT=process.env.PORT||3000,DIR=process.env.DATA_DIR||path.join(__dirname,'data'),FILE=path.join(DIR,'records.json');
app.use(express.json());app.use(express.static(path.join(__dirname,'public')));
fs.mkdirSync(DIR,{recursive:true});
if(!fs.existsSync(FILE))fs.writeFileSync(FILE,JSON.stringify({"students": []},null,2));
const read=()=>JSON.parse(fs.readFileSync(FILE,'utf8')),save=d=>fs.writeFileSync(FILE,JSON.stringify(d,null,2));
const id=a=>a.reduce((m,x)=>Math.max(m,x.id||0),0)+1;

app.post('/api/login',(q,s)=>{if(q.body.username==='faculty'&&q.body.password==='faculty123')return s.json({success:true});s.status(401).json({error:'Invalid demo login'});});
app.get('/api/students',(q,s)=>s.json(read().students));
app.post('/api/students',(q,s)=>{const {name,rollNo,department,email}=q.body;if(!name||!rollNo||!department)return s.status(400).json({error:'Name, roll number and department required'});const d=read();if(d.students.some(x=>x.rollNo===rollNo))return s.status(409).json({error:'Roll number exists'});const x={id:id(d.students),name,rollNo,department,email:email||'',attendance:[],marks:[]};d.students.push(x);save(d);s.status(201).json(x);});
app.post('/api/students/:id/attendance',(q,s)=>{const d=read(),x=d.students.find(v=>v.id===+q.params.id);if(!x)return s.status(404).json({error:'Student not found'});const {date,status}=q.body;if(!date||!['Present','Absent'].includes(status))return s.status(400).json({error:'Valid date and status required'});const old=x.attendance.find(v=>v.date===date);if(old)old.status=status;else x.attendance.push({date,status});save(d);s.json({success:true});});
app.post('/api/students/:id/marks',(q,s)=>{const d=read(),x=d.students.find(v=>v.id===+q.params.id);if(!x)return s.status(404).json({error:'Student not found'});const {subject,internal1,internal2}=q.body,a=Number(internal1),b=Number(internal2);if(!subject||![a,b].every(v=>Number.isFinite(v)&&v>=0&&v<=100))return s.status(400).json({error:'Subject and marks 0-100 required'});const m={subject,internal1:a,internal2:b,average:Number(((a+b)/2).toFixed(2))},old=x.marks.find(v=>v.subject===subject);if(old)Object.assign(old,m);else x.marks.push(m);save(d);s.json(m);});
app.get('/api/reports',(q,s)=>s.json(read().students.map(x=>{const p=x.attendance.filter(v=>v.status==='Present').length,t=x.attendance.length;return {id:x.id,name:x.name,rollNo:x.rollNo,department:x.department,present:p,total:t,attendancePercentage:t?Number((p/t*100).toFixed(2)):0,marks:x.marks}})));

app.get('/api/health',(q,s)=>s.json({status:'ok'}));
app.listen(PORT,'0.0.0.0',()=>console.log('Server running at http://localhost:'+PORT));
