(this.webpackJsonpmh_classifier=this.webpackJsonpmh_classifier||[]).push([[0],{100:function(e,t,a){e.exports=a.p+"static/media/human.2743a5cb.svg"},101:function(e,t,a){e.exports=a.p+"static/media/social_media.1639ff01.svg"},102:function(e,t,a){e.exports=a.p+"static/media/brain2.ff55f7e9.svg"},124:function(e,t,a){e.exports=a(242)},242:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(16),s=a.n(l),o=a(21),i=a(22),c=a(24),u=a(23),m=a(249),d=a(114),p=a(247),h=a(100),g=a.n(h),f=a(101),b=a.n(f),E=a(102),v=a.n(E),_="It seems like they are not feeling well lately. It would be a good idea to reach out to them and give them support.",y="It seems like they are doing okay, but make sure to cherish them. :)",x="Log likelihood of the text showing emotional distress: ",L="Log likelihood of the text showing positivity: ",w=a(32),S=a.n(w),C=a(68),k=a(103),j=a.n(k);function N(){return(N=Object(C.a)(S.a.mark((function e(){var t;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=j.a,e.next=3,O();case 3:return e.t1=e.sent,t=e.t0.parse.call(e.t0,e.t1).data,e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(){return T.apply(this,arguments)}function T(){return(T=Object(C.a)(S.a.mark((function e(){var t,a,n,r,l;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/mh_classifier/data/".concat("mh_dataset.csv"));case 2:return t=e.sent,a=t.body.getReader(),e.next=6,a.read();case 6:return n=e.sent,r=new TextDecoder("utf-8"),e.next=10,r.decode(n.value);case 10:return l=e.sent,e.abrupt("return",l);case 12:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var R=function(e,t){var a={};for(var n in e)a[n]=Math.log(e[n]/t);return a},W=function(e,t,a){for(var n=0,r=0;r<e.length;r++){var l=e[r];l in t&&(n+=t[l])}return n+Math.log(a)},z=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).onSubmit=function(e){e.preventDefault(),n.state.status.length>20?(n.setState({error:!1}),n.props.handleStatus(n.state.status)):(n.setState({error:!0}),n.props.handleStatus(null))},n.onChange=function(e){n.setState({status:e.target.value})},n.renderValidate=function(){return n.state.error?r.a.createElement("div",{className:"ui header red"}," Please enter more than 20 characters for better accuracy. "):null},n.state={status:"",error:!1},n}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"ui card container",style:{width:"40vw",padding:"20px"}},r.a.createElement("form",{className:"ui form clearing",onSubmit:this.onSubmit},r.a.createElement("div",{className:"field"},r.a.createElement("label",null,"Social Media Status"),r.a.createElement("input",{type:"text",name:"post",placeholder:"Enter your friend's social media post.",onChange:this.onChange})),r.a.createElement("div",null,this.renderValidate()),r.a.createElement("button",{className:"ui button primary right floated",type:"submit"},"Submit")))}}]),a}(r.a.Component),A=a(250),M=a(105),q=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(e=t.call.apply(t,[this].concat(l))).renderResult=function(){return null===e.props.depressed_bool?r.a.createElement(A.a,null,r.a.createElement("b",null,"Awaiting submission to get back results ...")):e.props.depressed_bool?r.a.createElement(r.a.Fragment,null,r.a.createElement(A.a,{className:"red"},r.a.createElement("b",null,_)),r.a.createElement(A.a,null,x," ",r.a.createElement("b",null,e.props.depressed_LL),r.a.createElement("br",null),r.a.createElement("br",null),L," ",r.a.createElement("b",null,e.props.nondepressed_LL))):r.a.createElement(r.a.Fragment,null,r.a.createElement(A.a,{className:"green"},r.a.createElement("b",null,y)),r.a.createElement(A.a,null,x," ",r.a.createElement("b",null,e.props.depressed_LL),r.a.createElement("br",null),r.a.createElement("br",null),L," ",r.a.createElement("b",null,e.props.nondepressed_LL)))},e}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(M.a,{className:"ui container"},this.renderResult())}}]),a}(r.a.Component),I=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).handleStatus=function(e){if(null===e)n.setState({depressed_bool:null,depressed_LL:null,nondepressed_LL:null});else{var t=function(e){for(var t=e.split(" "),a=0;a<t.length;a++)t[a]=t[a].toLowerCase().replace(/[^a-z]/,"");return t}(e),a=n.calculateEstimate(t);n.setState({depressed_bool:a})}},n.calculateEstimate=function(e){var t=-1*W(e,n.state.depressed_log_probs,.5),a=-1*W(e,n.state.nondepressed_log_probs,.5)+7;return n.setState({depressed_LL:t,nondepressed_LL:a}),Math.max(t,a)===t},n.state={depressed_log_probs:null,depressed_LL:null,nondepressed_log_probs:null,nondepressed_LL:null,depressed_bool:null},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;(function(){return N.apply(this,arguments)})().then((function(t){t.shift();var a=function(e){for(var t=0,a=0,n={},r={},l=0;l<e.length;l++)for(var s=e[l],o=s[0].split(" "),i=0;i<o.length;i++){var c=o[i].toLowerCase().replace(/[^a-z]/,"");"Yes"===s[1]?(c in n?n[c]+=1:n[c]=1,t+=1):"No"===s[1]&&(c in r?r[c]+=1:r[c]=1,a+=1)}return{depressed:{total_ct:t,freq_table:n},nondepressed:{total_ct:a,freq_table:r}}}(t),n=a.depressed,r=a.nondepressed,l=R(n.freq_table,n.total_ct),s=R(r.freq_table,r.total_ct);e.setState({depressed_log_probs:l,nondepressed_log_probs:s})}))}},{key:"render",value:function(){return r.a.createElement("div",{style:{backgroundColor:"tomato",marginLeft:"40px",marginRight:"40px"}},r.a.createElement(m.a,null,r.a.createElement(m.a.Row,{columns:1},r.a.createElement(m.a.Column,null,r.a.createElement("div",{className:"ui container header centered",style:{marginTop:"50px"}},r.a.createElement("h1",{style:{textAlign:"right",fontWeight:"lighter",color:"rgba(255,255,255,1)",fontSize:"large"}},"( by vinh ton )"),r.a.createElement(d.a,{className:"ui large image",src:v.a,style:{minWidth:"50px",marginTop:"30px"}}),r.a.createElement("h1",{style:{fontWeight:"lighter",color:"rgba(255,255,255,1)",marginTop:"0px"}}," peer mental health predictor tool")))),r.a.createElement(m.a.Row,{columns:1},r.a.createElement(m.a.Column,null,r.a.createElement("div",{className:"ui container centered header",style:{marginTop:"30px"}},r.a.createElement("h1",{style:{fontWeight:"lighter",color:"rgba(255,255,255,.60)",fontSize:"large",textAlign:"left"}},"instructions:"),r.a.createElement("h1",{style:{fontWeight:"lighter",color:"rgba(255,255,255,.60)",fontSize:"large",textAlign:"left",marginTop:"-12px"}},"input a social media post from a friend that you're concerned about to see if they might be feeling depressed or not")))),r.a.createElement(m.a.Row,{columns:4,style:{marginTop:"50px"}},r.a.createElement(m.a.Column,null),r.a.createElement(m.a.Column,null,r.a.createElement(d.a,{className:"ui container large image",src:b.a,style:{minWidth:"200px"}})),r.a.createElement(m.a.Column,null,r.a.createElement(d.a,{className:"ui container large image",src:g.a,style:{minWidth:"200px"}})),r.a.createElement(m.a.Column,null)),r.a.createElement(m.a.Row,{columns:2,style:{marginTop:"50px"}},r.a.createElement(m.a.Column,null,r.a.createElement(z,{handleStatus:this.handleStatus})),r.a.createElement(m.a.Column,{width:"8"},r.a.createElement(q,{depressed_bool:this.state.depressed_bool,depressed_LL:this.state.depressed_LL,nondepressed_LL:this.state.nondepressed_LL}))),r.a.createElement(m.a.Row,{columns:1,style:{marginTop:"200px"}},r.a.createElement(m.a.Column,null,r.a.createElement("div",{className:"ui container centered header"},r.a.createElement(p.a,{inverted:!0,to:"https://vinhton.com"},"see more projects")))),r.a.createElement(m.a.Row,{columns:1,style:{marginTop:"50px"}},r.a.createElement(m.a.Column,null,r.a.createElement("h2",{style:{fontWeight:"lighter",color:"rgba(255,255,255,.70)",fontSize:"medium"}},"disclaimer:"),r.a.createElement("h2",{style:{fontWeight:"lighter",color:"rgba(255,255,255,.70)",fontSize:"medium",marginTop:"-12px"}},"this tool is not meant to replace formal mental health diagnosis but rather an initial step in giving your friend support"),r.a.createElement("h2",{style:{fontWeight:"lighter",color:"rgba(255,255,255,.70)",fontSize:"medium"}})))))}}]),a}(r.a.Component);s.a.render(r.a.createElement(I,null),document.getElementById("root"))}},[[124,1,2]]]);
//# sourceMappingURL=main.fae71574.chunk.js.map