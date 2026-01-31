(self.webpackChunkreact_canvas_fiber_docs=self.webpackChunkreact_canvas_fiber_docs||[]).push([[1904],{42881:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return v}});var h=t(90819),f=t.n(h),w=t(89933),l=t.n(w),P=t(44194),_=t(9715),e=t(38949),v={"docs-complex-example-tree-select-demo-treeselectdemo":{component:P.memo(P.lazy(function(){return t.e(2433).then(t.bind(t,43291))})),asset:{type:"BLOCK",id:"docs-complex-example-tree-select-demo-treeselectdemo",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:t(12799).Z},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"},"./utils.ts":{type:"FILE",value:t(14515).Z}},entry:"index.tsx",title:"Tree Select \u53D7\u63A7\u5B9E\u4F8B"},context:{"./utils.ts":e,"@jiujue/react-canvas-fiber":_,react:m||(m=t.t(P,2)),"/home/runner/work/react-canvas-fiber/react-canvas-fiber/apps/dumi-docs/src/demos/TreeSelectDemo/utils.ts":e},renderOpts:{compile:function(){var g=l()(f()().mark(function n(){var d,a=arguments;return f()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.e(5420).then(t.bind(t,75420));case 2:return s.abrupt("return",(d=s.sent).default.apply(d,a));case 3:case"end":return s.stop()}},n)}));function i(){return g.apply(this,arguments)}return i}()}}}},66348:function(E,p,t){"use strict";t.r(p),t.d(p,{demos:function(){return _}});var m=t(90819),h=t.n(m),f=t(89933),w=t.n(f),l=t(44194),P=t(9715),_={"docs-components-canvas-demo-0":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n,d;return h()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=o.sent,g=v.Canvas,i=v.Rect,n=v.Text,d=v.View,o.abrupt("return",{default:function(){var r=typeof window!="undefined"&&window.devicePixelRatio||1;return l.createElement(g,{width:720,height:360,dpr:r,clearColor:"#0b1020",style:{borderRadius:12,border:"1px solid rgba(255,255,255,0.12)"}},l.createElement(d,{style:{width:720,height:360,padding:16,flexDirection:"column",gap:10}},l.createElement(n,{text:"Canvas",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),l.createElement(i,{style:{width:240,height:54},borderRadius:14,fill:"#60a5fa"})))}});case 8:case"end":return o.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-components-canvas-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas
			width={720}
			height={360}
			dpr={dpr}
			clearColor="#0b1020"
			style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}
		>
			<View style={{ width: 720, height: 360, padding: 16, flexDirection: 'column', gap: 10 }}>
				<Text text="Canvas" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<Rect style={{ width: 240, height: 54 }} borderRadius={14} fill="#60a5fa" />
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}}}},33537:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(45332),f=t.n(h),w=t(90819),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-components-circle-demo-0":{component:e.memo(e.lazy(_()(l()().mark(function i(){var n,d,a,o,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=u.sent,d=n.Canvas,a=n.Circle,o=n.Text,s=n.View,u.abrupt("return",{default:function(){var c=typeof window!="undefined"&&window.devicePixelRatio||1;return e.createElement(d,{width:720,height:320,dpr:c,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:320,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:"Circle",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:16,alignItems:"center"}},e.createElement(a,{style:{width:72,height:72},fill:"#60a5fa"}),e.createElement(a,{style:{width:72,height:72},fill:"rgba(255,255,255,0.08)",stroke:"#22c55e",lineWidth:3}),e.createElement(a,{style:{width:120,height:72},fill:"rgba(255,255,255,0.10)",stroke:"rgba(229,231,235,0.6)",lineWidth:2}))))}});case 8:case"end":return u.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-circle-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Circle, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Circle" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
					<Circle style={{ width: 72, height: 72 }} fill="#60a5fa" />
					<Circle
						style={{ width: 72, height: 72 }}
						fill="rgba(255,255,255,0.08)"
						stroke="#22c55e"
						lineWidth={3}
					/>
					<Circle
						style={{ width: 120, height: 72 }}
						fill="rgba(255,255,255,0.10)"
						stroke="rgba(229,231,235,0.6)"
						lineWidth={2}
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v},renderOpts:{compile:function(){var i=_()(l()().mark(function d(){var a,o=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-components-circle-demo-1":{component:e.memo(e.lazy(_()(l()().mark(function i(){var n,d,a,o,s,r,u;return l()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Circle,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(!1),x=f()(M,2),I=x[0],T=x[1];return e.createElement(d,{width:720,height:260,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:260,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:I?"onClick: ACTIVE":"onClick: INACTIVE",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12,alignItems:"center"}},e.createElement(a,{style:{width:160,height:160},fill:I?"#22c55e":"#ef4444",onClick:function(){return T(function(C){return!C})}}),e.createElement(o,{text:"\u70B9\u51FB\u5706\u5F62\u533A\u57DF\u5207\u6362\uFF1B\u77E9\u5F62\u5916\u4F46\u5728\u5305\u56F4\u76D2\u5185\u7684\u533A\u57DF\u4E0D\u4F1A\u547D\u4E2D",style:{fontSize:14,maxWidth:360,lineHeight:18},color:"rgba(229,231,235,0.75)"}))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-circle-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Circle, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [on, setOn] = useState(false)

	return (
		<Canvas width={720} height={260} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 260, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={on ? 'onClick: ACTIVE' : 'onClick: INACTIVE'}
					style={{ fontSize: 18, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Circle
						style={{ width: 160, height: 160 }}
						fill={on ? '#22c55e' : '#ef4444'}
						onClick={() => setOn((v) => !v)}
					/>
					<Text
						text="\u70B9\u51FB\u5706\u5F62\u533A\u57DF\u5207\u6362\uFF1B\u77E9\u5F62\u5916\u4F46\u5728\u5305\u56F4\u76D2\u5185\u7684\u533A\u57DF\u4E0D\u4F1A\u547D\u4E2D"
						style={{ fontSize: 14, maxWidth: 360, lineHeight: 18 }}
						color="rgba(229,231,235,0.75)"
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(l()().mark(function d(){var a,o=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},12490:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-components-group-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u,b,c;return f()().wrap(function(D){for(;;)switch(D.prev=D.next){case 0:return D.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=D.sent,d=n.Canvas,a=n.Group,o=n.Rect,s=n.Text,r=n.View,D.next=10,Promise.resolve().then(t.t.bind(t,44194,19));case 10:return u=D.sent,b=u.useMemo,c=u.useState,D.abrupt("return",{default:function(){var x=typeof window!="undefined"&&window.devicePixelRatio||1,I=720,T=360,j=c(-12),C=l()(j,2),O=C[0],W=C[1],S=c(1.05),R=l()(S,2),V=R[0],U=R[1],z=c(1),L=l()(z,2),K=L[0],N=L[1],A=c(2),B=l()(A,2),G=B[0],J=B[1],Y=c(!1),$=l()(Y,2),k=$[0],Q=$[1],q=b(function(){return"rotate(".concat(O,"deg) scale(").concat(V,")")},[O,V]);return e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:12}},e.createElement("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}},e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("span",{style:{width:92}},"angle"),e.createElement("input",{type:"range",min:-45,max:45,step:1,value:O,onChange:function(F){return W(Number(F.target.value))}}),e.createElement("span",{style:{width:52}},O,"\xB0")),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("span",{style:{width:92}},"scale"),e.createElement("input",{type:"range",min:.5,max:1.8,step:.01,value:V,onChange:function(F){return U(Number(F.target.value))}}),e.createElement("span",{style:{width:52}},V.toFixed(2))),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("span",{style:{width:92}},"opacity"),e.createElement("input",{type:"range",min:0,max:1,step:.05,value:K,onChange:function(F){return N(Number(F.target.value))}}),e.createElement("span",{style:{width:52}},K.toFixed(2))),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("span",{style:{width:92}},"zIndex"),e.createElement("input",{type:"range",min:0,max:10,step:1,value:G,onChange:function(F){return J(Number(F.target.value))}}),e.createElement("span",{style:{width:52}},G)),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("input",{type:"checkbox",checked:k,onChange:function(F){return Q(F.target.checked)}}),e.createElement("span",null,"overflow: hidden")),e.createElement("button",{onClick:function(){W(-12),U(1.05),N(1),J(2),Q(!1)}},"reset")),e.createElement(d,{width:I,height:T,dpr:x,clearColor:"#0b1020"},e.createElement(r,{style:{width:I,height:T,padding:18,flexDirection:"column",gap:12}},e.createElement(s,{text:"Group: unified transform",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(r,{style:{flexGrow:1,background:"rgba(255,255,255,0.06)",borderRadius:16,padding:18,position:"relative"}},e.createElement(a,{style:{position:"absolute",left:240,top:70,width:240,height:160,transform:q,transformOrigin:"center",opacity:K,zIndex:G,overflow:k?"hidden":"visible"}},e.createElement(o,{style:{width:240,height:160},borderRadius:18,fill:"rgba(255,255,255,0.10)"}),e.createElement(o,{style:{position:"absolute",left:-22,top:28,width:140,height:56},borderRadius:14,fill:"#60a5fa"}),e.createElement(o,{style:{position:"absolute",left:122,top:76,width:140,height:56},borderRadius:14,fill:"#22c55e"}),e.createElement(s,{text:"zIndex ".concat(G),style:{position:"absolute",left:16,top:10,fontSize:14,fontWeight:700},color:"#e5e7eb"})),e.createElement(o,{style:{position:"absolute",left:70,top:120,width:220,height:84,zIndex:1},borderRadius:18,fill:"rgba(239,68,68,0.35)"}),e.createElement(s,{text:"Underlay (zIndex 1)",style:{position:"absolute",left:84,top:132,fontSize:14,fontWeight:700},color:"#fecaca"})))))}});case 14:case"end":return D.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-group-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Group, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360
	const [angle, setAngle] = useState(-12)
	const [scale, setScale] = useState(1.05)
	const [opacity, setOpacity] = useState(1)
	const [zIndex, setZIndex] = useState(2)
	const [overflowHidden, setOverflowHidden] = useState(false)
	const transform = useMemo(() => \`rotate(\${angle}deg) scale(\${scale})\`, [angle, scale])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
			<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>angle</span>
					<input
						type="range"
						min={-45}
						max={45}
						step={1}
						value={angle}
						onChange={(e) => setAngle(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{angle}\xB0</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>scale</span>
					<input
						type="range"
						min={0.5}
						max={1.8}
						step={0.01}
						value={scale}
						onChange={(e) => setScale(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{scale.toFixed(2)}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>opacity</span>
					<input
						type="range"
						min={0}
						max={1}
						step={0.05}
						value={opacity}
						onChange={(e) => setOpacity(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{opacity.toFixed(2)}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>zIndex</span>
					<input
						type="range"
						min={0}
						max={10}
						step={1}
						value={zIndex}
						onChange={(e) => setZIndex(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{zIndex}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<input
						type="checkbox"
						checked={overflowHidden}
						onChange={(e) => setOverflowHidden(e.target.checked)}
					/>
					<span>overflow: hidden</span>
				</label>
				<button
					onClick={() => {
						setAngle(-12)
						setScale(1.05)
						setOpacity(1)
						setZIndex(2)
						setOverflowHidden(false)
					}}
				>
					reset
				</button>
			</div>

			<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
				<View style={{ width, height, padding: 18, flexDirection: 'column', gap: 12 }}>
					<Text
						text="Group: unified transform"
						style={{ fontSize: 18, fontWeight: 700 }}
						color="#e5e7eb"
					/>

					<View
						style={{
							flexGrow: 1,
							background: 'rgba(255,255,255,0.06)',
							borderRadius: 16,
							padding: 18,
							position: 'relative',
						}}
					>
						<Group
							style={{
								position: 'absolute',
								left: 240,
								top: 70,
								width: 240,
								height: 160,
								transform,
								transformOrigin: 'center',
								opacity,
								zIndex,
								overflow: overflowHidden ? 'hidden' : 'visible',
							}}
						>
							<Rect
								style={{ width: 240, height: 160 }}
								borderRadius={18}
								fill="rgba(255,255,255,0.10)"
							/>
							<Rect
								style={{ position: 'absolute', left: -22, top: 28, width: 140, height: 56 }}
								borderRadius={14}
								fill="#60a5fa"
							/>
							<Rect
								style={{ position: 'absolute', left: 122, top: 76, width: 140, height: 56 }}
								borderRadius={14}
								fill="#22c55e"
							/>
							<Text
								text={\`zIndex \${zIndex}\`}
								style={{ position: 'absolute', left: 16, top: 10, fontSize: 14, fontWeight: 700 }}
								color="#e5e7eb"
							/>
						</Group>

						<Rect
							style={{
								position: 'absolute',
								left: 70,
								top: 120,
								width: 220,
								height: 84,
								zIndex: 1,
							}}
							borderRadius={18}
							fill="rgba(239,68,68,0.35)"
						/>
						<Text
							text="Underlay (zIndex 1)"
							style={{ position: 'absolute', left: 84, top: 132, fontSize: 14, fontWeight: 700 }}
							color="#fecaca"
						/>
					</View>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},53249:function(E,p,t){"use strict";t.r(p),t.d(p,{demos:function(){return _}});var m=t(90819),h=t.n(m),f=t(89933),w=t.n(f),l=t(44194),P=t(9715),_={"docs-components-image-demo-0":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n,d;return h()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=o.sent,g=v.Canvas,i=v.Image,n=v.Text,d=v.View,o.abrupt("return",{default:function(){var r=typeof window!="undefined"&&window.devicePixelRatio||1,u="data:image/svg+xml;utf8,"+encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#60a5fa"/>
      <stop offset="1" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <circle cx="256" cy="256" r="168" fill="rgba(0,0,0,0.22)"/>
  <text x="256" y="252" text-anchor="middle" font-size="44" font-family="system-ui" fill="#ffffff" font-weight="700">Image</text>
  <text x="256" y="304" text-anchor="middle" font-size="22" font-family="system-ui" fill="rgba(255,255,255,0.85)">CORS-safe demo</text>
</svg>
`);return l.createElement(g,{width:720,height:400,dpr:r,clearColor:"#0b1020"},l.createElement(d,{style:{width:720,height:400,padding:16,flexDirection:"column",gap:12}},l.createElement(n,{text:"Image",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),l.createElement(d,{style:{flexDirection:"row",gap:12,alignItems:"center"}},l.createElement(d,{style:{flexDirection:"column",gap:8}},l.createElement(n,{text:"objectFit: cover",style:{fontSize:14},color:"#94a3b8"}),l.createElement(i,{src:u,style:{width:200,height:200},borderRadius:16,objectFit:"cover"})),l.createElement(d,{style:{flexDirection:"column",gap:8}},l.createElement(n,{text:"objectFit: contain",style:{fontSize:14},color:"#94a3b8"}),l.createElement(i,{src:u,style:{width:200,height:200,background:"#1e293b"},borderRadius:16,objectFit:"contain"})),l.createElement(d,{style:{flexDirection:"column",gap:8}},l.createElement(n,{text:"objectFit: fill",style:{fontSize:14},color:"#94a3b8"}),l.createElement(i,{src:u,style:{width:200,height:200},borderRadius:16,objectFit:"fill"})))))}});case 8:case"end":return o.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-components-image-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Image, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const src =
		'data:image/svg+xml;utf8,' +
		encodeURIComponent(\`
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#60a5fa"/>
      <stop offset="1" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <circle cx="256" cy="256" r="168" fill="rgba(0,0,0,0.22)"/>
  <text x="256" y="252" text-anchor="middle" font-size="44" font-family="system-ui" fill="#ffffff" font-weight="700">Image</text>
  <text x="256" y="304" text-anchor="middle" font-size="22" font-family="system-ui" fill="rgba(255,255,255,0.85)">CORS-safe demo</text>
</svg>
\`)

	return (
		<Canvas width={720} height={400} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 400, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Image" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					{/* Cover + Rounded */}
					<View style={{ flexDirection: 'column', gap: 8 }}>
						<Text text="objectFit: cover" style={{ fontSize: 14 }} color="#94a3b8" />
						<Image
							src={src}
							style={{ width: 200, height: 200 }}
							borderRadius={16}
							objectFit="cover"
						/>
					</View>
					{/* Contain */}
					<View style={{ flexDirection: 'column', gap: 8 }}>
						<Text text="objectFit: contain" style={{ fontSize: 14 }} color="#94a3b8" />
						<Image
							src={src}
							style={{ width: 200, height: 200, background: '#1e293b' }}
							borderRadius={16}
							objectFit="contain"
						/>
					</View>
					{/* Fill */}
					<View style={{ flexDirection: 'column', gap: 8 }}>
						<Text text="objectFit: fill" style={{ fontSize: 14 }} color="#94a3b8" />
						<Image
							src={src}
							style={{ width: 200, height: 200 }}
							borderRadius={16}
							objectFit="fill"
						/>
					</View>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}}}},56516:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-components-layer-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u,b;return f()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=y.sent,d=n.Canvas,a=n.Layer,o=n.Rect,s=n.Text,r=n.View,y.next=10,Promise.resolve().then(t.t.bind(t,44194,19));case 10:return u=y.sent,b=u.useState,y.abrupt("return",{default:function(){var M=typeof window!="undefined"&&window.devicePixelRatio||1,x=720,I=360,T=b(230),j=l()(T,2),C=j[0],O=j[1],W=b(110),S=l()(W,2),R=S[0],V=S[1],U=b(1),z=l()(U,2),L=z[0],K=z[1],N=b(2),A=l()(N,2),B=A[0],G=A[1],J=b(18),Y=l()(J,2),$=Y[0],k=Y[1],Q=b(!0),q=l()(Q,2),X=q[0],F=q[1],at=b(!0),tt=l()(at,2),et=tt[0],nt=tt[1];return e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:12}},e.createElement("div",{style:{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}},e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("span",{style:{width:92}},"B left"),e.createElement("input",{type:"range",min:80,max:320,step:1,value:C,onChange:function(H){return O(Number(H.target.value))}}),e.createElement("span",{style:{width:52}},C)),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("span",{style:{width:92}},"B top"),e.createElement("input",{type:"range",min:40,max:180,step:1,value:R,onChange:function(H){return V(Number(H.target.value))}}),e.createElement("span",{style:{width:52}},R)),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("span",{style:{width:92}},"A zIndex"),e.createElement("input",{type:"range",min:0,max:10,step:1,value:L,onChange:function(H){return K(Number(H.target.value))}}),e.createElement("span",{style:{width:52}},L)),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("span",{style:{width:92}},"B zIndex"),e.createElement("input",{type:"range",min:0,max:10,step:1,value:B,onChange:function(H){return G(Number(H.target.value))}}),e.createElement("span",{style:{width:52}},B)),e.createElement("button",{onClick:function(){return K(B+1)}},"A \u5728\u4E0A"),e.createElement("button",{onClick:function(){return G(L+1)}},"B \u5728\u4E0A"),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("span",{style:{width:92}},"radius"),e.createElement("input",{type:"range",min:0,max:32,step:1,value:$,onChange:function(H){return k(Number(H.target.value))}}),e.createElement("span",{style:{width:52}},$)),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("input",{type:"checkbox",checked:X,onChange:function(H){return F(H.target.checked)}}),e.createElement("span",null,"A overflow: hidden")),e.createElement("label",{style:{display:"flex",gap:8,alignItems:"center"}},e.createElement("input",{type:"checkbox",checked:et,onChange:function(H){return nt(H.target.checked)}}),e.createElement("span",null,"B overflow: hidden")),e.createElement("button",{onClick:function(){O(230),V(110),K(1),G(2),k(18),F(!0),nt(!0)}},"reset"),e.createElement("span",{style:{color:"rgba(255,255,255,0.65)"}},"zIndex \u8D8A\u5927\u8D8A\u9760\u4E0A\uFF1B\u76F8\u7B49\u65F6\u540E\u6E32\u67D3\u7684\u8282\u70B9\u5728\u4E0A")),e.createElement(d,{width:x,height:I,dpr:M,clearColor:"#0b1020"},e.createElement(r,{style:{width:x,height:I,padding:18,flexDirection:"column",gap:12}},e.createElement(s,{text:"Layer: clip + zIndex",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(r,{style:{flexGrow:1,background:"rgba(255,255,255,0.06)",borderRadius:16,position:"relative"}},e.createElement(a,{style:{position:"absolute",left:70,top:60,width:320,height:180,zIndex:L,overflow:X?"hidden":"visible"},background:"rgba(96,165,250,0.10)",border:"2px solid rgba(96,165,250,0.55)",borderRadius:$},e.createElement(s,{text:"Layer A (zIndex ".concat(L,")"),style:{fontSize:14,fontWeight:700,padding:12},color:"#dbeafe"}),e.createElement(o,{style:{position:"absolute",left:-60,top:86,width:220,height:70},borderRadius:16,fill:"#60a5fa"})),e.createElement(a,{style:{position:"absolute",left:C,top:R,width:340,height:190,zIndex:B,overflow:et?"hidden":"visible"},background:"rgba(34,197,94,0.10)",border:"2px solid rgba(34,197,94,0.55)",borderRadius:$},e.createElement(s,{text:"Layer B (zIndex ".concat(B,")"),style:{fontSize:14,fontWeight:700,padding:12},color:"#dcfce7"}),e.createElement(o,{style:{position:"absolute",left:180,top:96,width:220,height:70},borderRadius:16,fill:"#22c55e"}))))))}});case 13:case"end":return y.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-layer-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Layer, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360
	const [offsetX, setOffsetX] = useState(230)
	const [offsetY, setOffsetY] = useState(110)
	const [layerAZ, setLayerAZ] = useState(1)
	const [layerBZ, setLayerBZ] = useState(2)
	const [radius, setRadius] = useState(18)
	const [clipA, setClipA] = useState(true)
	const [clipB, setClipB] = useState(true)

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
			<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>B left</span>
					<input
						type="range"
						min={80}
						max={320}
						step={1}
						value={offsetX}
						onChange={(e) => setOffsetX(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{offsetX}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>B top</span>
					<input
						type="range"
						min={40}
						max={180}
						step={1}
						value={offsetY}
						onChange={(e) => setOffsetY(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{offsetY}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>A zIndex</span>
					<input
						type="range"
						min={0}
						max={10}
						step={1}
						value={layerAZ}
						onChange={(e) => setLayerAZ(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{layerAZ}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>B zIndex</span>
					<input
						type="range"
						min={0}
						max={10}
						step={1}
						value={layerBZ}
						onChange={(e) => setLayerBZ(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{layerBZ}</span>
				</label>
				<button onClick={() => setLayerAZ(layerBZ + 1)}>A \u5728\u4E0A</button>
				<button onClick={() => setLayerBZ(layerAZ + 1)}>B \u5728\u4E0A</button>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>radius</span>
					<input
						type="range"
						min={0}
						max={32}
						step={1}
						value={radius}
						onChange={(e) => setRadius(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{radius}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<input type="checkbox" checked={clipA} onChange={(e) => setClipA(e.target.checked)} />
					<span>A overflow: hidden</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<input type="checkbox" checked={clipB} onChange={(e) => setClipB(e.target.checked)} />
					<span>B overflow: hidden</span>
				</label>
				<button
					onClick={() => {
						setOffsetX(230)
						setOffsetY(110)
						setLayerAZ(1)
						setLayerBZ(2)
						setRadius(18)
						setClipA(true)
						setClipB(true)
					}}
				>
					reset
				</button>
				<span style={{ color: 'rgba(255,255,255,0.65)' }}>
					zIndex \u8D8A\u5927\u8D8A\u9760\u4E0A\uFF1B\u76F8\u7B49\u65F6\u540E\u6E32\u67D3\u7684\u8282\u70B9\u5728\u4E0A
				</span>
			</div>

			<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
				<View style={{ width, height, padding: 18, flexDirection: 'column', gap: 12 }}>
					<Text
						text="Layer: clip + zIndex"
						style={{ fontSize: 18, fontWeight: 700 }}
						color="#e5e7eb"
					/>
					<View
						style={{
							flexGrow: 1,
							background: 'rgba(255,255,255,0.06)',
							borderRadius: 16,
							position: 'relative',
						}}
					>
						<Layer
							style={{
								position: 'absolute',
								left: 70,
								top: 60,
								width: 320,
								height: 180,
								zIndex: layerAZ,
								overflow: clipA ? 'hidden' : 'visible',
							}}
							background="rgba(96,165,250,0.10)"
							border="2px solid rgba(96,165,250,0.55)"
							borderRadius={radius}
						>
							<Text
								text={\`Layer A (zIndex \${layerAZ})\`}
								style={{ fontSize: 14, fontWeight: 700, padding: 12 }}
								color="#dbeafe"
							/>
							<Rect
								style={{ position: 'absolute', left: -60, top: 86, width: 220, height: 70 }}
								borderRadius={16}
								fill="#60a5fa"
							/>
						</Layer>

						<Layer
							style={{
								position: 'absolute',
								left: offsetX,
								top: offsetY,
								width: 340,
								height: 190,
								zIndex: layerBZ,
								overflow: clipB ? 'hidden' : 'visible',
							}}
							background="rgba(34,197,94,0.10)"
							border="2px solid rgba(34,197,94,0.55)"
							borderRadius={radius}
						>
							<Text
								text={\`Layer B (zIndex \${layerBZ})\`}
								style={{ fontSize: 14, fontWeight: 700, padding: 12 }}
								color="#dcfce7"
							/>
							<Rect
								style={{ position: 'absolute', left: 180, top: 96, width: 220, height: 70 }}
								borderRadius={16}
								fill="#22c55e"
							/>
						</Layer>
					</View>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},37472:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(45332),f=t.n(h),w=t(90819),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-components-line-demo-0":{component:e.memo(e.lazy(_()(l()().mark(function i(){var n,d,a,o,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=u.sent,d=n.Canvas,a=n.Line,o=n.Text,s=n.View,u.abrupt("return",{default:function(){var c=typeof window!="undefined"&&window.devicePixelRatio||1;return e.createElement(d,{width:720,height:280,dpr:c,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:280,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:"Line",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"column",gap:14}},e.createElement(a,{style:{width:520,height:26},y1:13,y2:13,stroke:"#60a5fa",lineWidth:2}),e.createElement(a,{style:{width:520,height:26},y1:13,y2:13,stroke:"#22c55e",lineWidth:10,lineCap:"round"}),e.createElement(a,{style:{width:520,height:80},x1:0,y1:0,x2:520,y2:80,stroke:"rgba(229,231,235,0.75)",lineWidth:3,lineCap:"square"}))))}});case 8:case"end":return u.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-line-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Line, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas width={720} height={280} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 280, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Line" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'column', gap: 14 }}>
					<Line style={{ width: 520, height: 26 }} y1={13} y2={13} stroke="#60a5fa" lineWidth={2} />
					<Line
						style={{ width: 520, height: 26 }}
						y1={13}
						y2={13}
						stroke="#22c55e"
						lineWidth={10}
						lineCap="round"
					/>
					<Line
						style={{ width: 520, height: 80 }}
						x1={0}
						y1={0}
						x2={520}
						y2={80}
						stroke="rgba(229,231,235,0.75)"
						lineWidth={3}
						lineCap="square"
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v},renderOpts:{compile:function(){var i=_()(l()().mark(function d(){var a,o=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-components-line-demo-1":{component:e.memo(e.lazy(_()(l()().mark(function i(){var n,d,a,o,s,r,u;return l()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Line,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(!1),x=f()(M,2),I=x[0],T=x[1];return e.createElement(d,{width:720,height:260,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:260,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:I?"onClick: ACTIVE":"onClick: INACTIVE",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12,alignItems:"center"}},e.createElement(a,{style:{width:260,height:140},stroke:I?"#22c55e":"#ef4444",lineWidth:I?14:6,lineCap:I?"round":"butt",onClick:function(){return T(function(C){return!C})}}),e.createElement(o,{text:"\u70B9\u51FB\u7EBF\u6BB5\u9644\u8FD1\u53EF\u547D\u4E2D\u5E76\u5207\u6362\u72B6\u6001",style:{fontSize:14,maxWidth:360,lineHeight:18},color:"rgba(229,231,235,0.75)"}))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-line-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Line, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [on, setOn] = useState(false)

	return (
		<Canvas width={720} height={260} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 260, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={on ? 'onClick: ACTIVE' : 'onClick: INACTIVE'}
					style={{ fontSize: 18, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Line
						style={{ width: 260, height: 140 }}
						stroke={on ? '#22c55e' : '#ef4444'}
						lineWidth={on ? 14 : 6}
						lineCap={on ? 'round' : 'butt'}
						onClick={() => setOn((v) => !v)}
					/>
					<Text
						text="\u70B9\u51FB\u7EBF\u6BB5\u9644\u8FD1\u53EF\u547D\u4E2D\u5E76\u5207\u6362\u72B6\u6001"
						style={{ fontSize: 14, maxWidth: 360, lineHeight: 18 }}
						color="rgba(229,231,235,0.75)"
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(l()().mark(function d(){var a,o=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},23965:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(45332),f=t.n(h),w=t(90819),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-components-path-demo-0":{component:e.memo(e.lazy(_()(l()().mark(function i(){var n,d,a,o,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=u.sent,d=n.Canvas,a=n.Path,o=n.Text,s=n.View,u.abrupt("return",{default:function(){var c=typeof window!="undefined"&&window.devicePixelRatio||1;return e.createElement(d,{width:720,height:320,dpr:c,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:320,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:"Path",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:16,alignItems:"center"}},e.createElement(a,{style:{width:120,height:60},d:"M 0 60 L 60 0 L 120 60 Z",fill:"#60a5fa"}),e.createElement(a,{style:{width:120,height:60},d:"M 0 60 L 60 0 L 120 60 Z",fill:"rgba(255,255,255,0.08)",stroke:"#22c55e",lineWidth:3}),e.createElement(a,{style:{width:140,height:72},d:"M 0 36 C 18 4, 48 4, 70 28 C 92 52, 122 52, 140 20 L 140 72 L 0 72 Z",fill:"rgba(255,255,255,0.10)",stroke:"rgba(229,231,235,0.6)",lineWidth:2}))))}});case 8:case"end":return u.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-path-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Path, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Path" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
					<Path style={{ width: 120, height: 60 }} d="M 0 60 L 60 0 L 120 60 Z" fill="#60a5fa" />
					<Path
						style={{ width: 120, height: 60 }}
						d="M 0 60 L 60 0 L 120 60 Z"
						fill="rgba(255,255,255,0.08)"
						stroke="#22c55e"
						lineWidth={3}
					/>
					<Path
						style={{ width: 140, height: 72 }}
						d="M 0 36 C 18 4, 48 4, 70 28 C 92 52, 122 52, 140 20 L 140 72 L 0 72 Z"
						fill="rgba(255,255,255,0.10)"
						stroke="rgba(229,231,235,0.6)"
						lineWidth={2}
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v},renderOpts:{compile:function(){var i=_()(l()().mark(function d(){var a,o=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-components-path-demo-1":{component:e.memo(e.lazy(_()(l()().mark(function i(){var n,d,a,o,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=u.sent,d=n.Canvas,a=n.Path,o=n.Text,s=n.View,u.abrupt("return",{default:function(){var c=typeof window!="undefined"&&window.devicePixelRatio||1,y="M 0 0 H 160 V 160 H 0 Z M 40 40 H 120 V 120 H 40 Z";return e.createElement(d,{width:720,height:300,dpr:c,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:300,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:"fillRule",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:16,alignItems:"center"}},e.createElement(s,{style:{width:160,gap:8}},e.createElement(o,{text:"\u9ED8\u8BA4\uFF08nonzero\uFF09",style:{fontSize:12},color:"rgba(229,231,235,0.75)"}),e.createElement(a,{style:{width:160,height:160},d:y,fill:"#60a5fa"})),e.createElement(s,{style:{width:160,gap:8}},e.createElement(o,{text:"evenodd\uFF08\u4E2D\u95F4\u7A7A\u6D1E\uFF09",style:{fontSize:12},color:"rgba(229,231,235,0.75)"}),e.createElement(a,{style:{width:160,height:160},d:y,fill:"#22c55e",fillRule:"evenodd"})))))}});case 8:case"end":return u.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-path-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Path, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const d = 'M 0 0 H 160 V 160 H 0 Z M 40 40 H 120 V 120 H 40 Z'

	return (
		<Canvas width={720} height={300} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 300, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="fillRule" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
					<View style={{ width: 160, gap: 8 }}>
						<Text text="\u9ED8\u8BA4\uFF08nonzero\uFF09" style={{ fontSize: 12 }} color="rgba(229,231,235,0.75)" />
						<Path style={{ width: 160, height: 160 }} d={d} fill="#60a5fa" />
					</View>
					<View style={{ width: 160, gap: 8 }}>
						<Text
							text="evenodd\uFF08\u4E2D\u95F4\u7A7A\u6D1E\uFF09"
							style={{ fontSize: 12 }}
							color="rgba(229,231,235,0.75)"
						/>
						<Path style={{ width: 160, height: 160 }} d={d} fill="#22c55e" fillRule="evenodd" />
					</View>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v},renderOpts:{compile:function(){var i=_()(l()().mark(function d(){var a,o=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-components-path-demo-2":{component:e.memo(e.lazy(_()(l()().mark(function i(){var n,d,a,o,s,r,u;return l()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Path,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(!1),x=f()(M,2),I=x[0],T=x[1],j="M 0 0 H 180 V 180 H 0 Z M 52 52 H 128 V 128 H 52 Z";return e.createElement(d,{width:720,height:280,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:280,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:I?"onClick: ACTIVE":"onClick: INACTIVE",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12,alignItems:"center"}},e.createElement(a,{style:{width:180,height:180},d:j,fill:I?"#22c55e":"#ef4444",fillRule:"evenodd",onClick:function(){return T(function(O){return!O})}}),e.createElement(o,{text:"\u70B9\u51FB\u5916\u5708\u5207\u6362\uFF1B\u4E2D\u95F4\u7A7A\u6D1E\u533A\u57DF\u4E0D\u4F1A\u547D\u4E2D",style:{fontSize:14,maxWidth:360,lineHeight:18},color:"rgba(229,231,235,0.75)"}))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-path-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Path, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [on, setOn] = useState(false)
	const d = 'M 0 0 H 180 V 180 H 0 Z M 52 52 H 128 V 128 H 52 Z'

	return (
		<Canvas width={720} height={280} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 280, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={on ? 'onClick: ACTIVE' : 'onClick: INACTIVE'}
					style={{ fontSize: 18, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Path
						style={{ width: 180, height: 180 }}
						d={d}
						fill={on ? '#22c55e' : '#ef4444'}
						fillRule="evenodd"
						onClick={() => setOn((v) => !v)}
					/>
					<Text
						text="\u70B9\u51FB\u5916\u5708\u5207\u6362\uFF1B\u4E2D\u95F4\u7A7A\u6D1E\u533A\u57DF\u4E0D\u4F1A\u547D\u4E2D"
						style={{ fontSize: 14, maxWidth: 360, lineHeight: 18 }}
						color="rgba(229,231,235,0.75)"
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(l()().mark(function d(){var a,o=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},16771:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(45332),f=t.n(h),w=t(90819),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-components-rect-demo-0":{component:e.memo(e.lazy(_()(l()().mark(function i(){var n,d,a,o,s;return l()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=u.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,u.abrupt("return",{default:function(){var c=typeof window!="undefined"&&window.devicePixelRatio||1;return e.createElement(d,{width:720,height:320,dpr:c,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:320,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:"Rect",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12,alignItems:"center"}},e.createElement(a,{style:{width:180,height:64},borderRadius:16,fill:"#60a5fa"}),e.createElement(a,{style:{width:180,height:64},borderRadius:16,fill:"rgba(255,255,255,0.08)",stroke:"#22c55e",lineWidth:3}),e.createElement(a,{style:{flexGrow:1,height:64},borderRadius:16,fill:"rgba(255,255,255,0.10)"}))))}});case 8:case"end":return u.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-rect-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Rect" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Rect style={{ width: 180, height: 64 }} borderRadius={16} fill="#60a5fa" />
					<Rect
						style={{ width: 180, height: 64 }}
						borderRadius={16}
						fill="rgba(255,255,255,0.08)"
						stroke="#22c55e"
						lineWidth={3}
					/>
					<Rect
						style={{ flexGrow: 1, height: 64 }}
						borderRadius={16}
						fill="rgba(255,255,255,0.10)"
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v},renderOpts:{compile:function(){var i=_()(l()().mark(function d(){var a,o=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-components-rect-demo-1":{component:e.memo(e.lazy(_()(l()().mark(function i(){var n,d,a,o,s,r,u;return l()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(!1),x=f()(M,2),I=x[0],T=x[1];return e.createElement(d,{width:720,height:240,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:240,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:I?"ON":"OFF",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(a,{style:{width:240,height:56},borderRadius:14,fill:I?"#22c55e":"#ef4444",onClick:function(){return T(function(C){return!C})}})))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-components-rect-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [on, setOn] = useState(false)

	return (
		<Canvas width={720} height={240} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 240, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text={on ? 'ON' : 'OFF'} style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<Rect
					style={{ width: 240, height: 56 }}
					borderRadius={14}
					fill={on ? '#22c55e' : '#ef4444'}
					onClick={() => setOn((v) => !v)}
				/>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(l()().mark(function d(){var a,o=arguments;return l()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},98157:function(E,p,t){"use strict";t.r(p),t.d(p,{demos:function(){return _}});var m=t(90819),h=t.n(m),f=t(89933),w=t.n(f),l=t(44194),P=t(9715),_={"docs-components-text-demo-0":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n,d;return h()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=o.sent,g=v.Canvas,i=v.Rect,n=v.Text,d=v.View,o.abrupt("return",{default:function(){var r=typeof window!="undefined"&&window.devicePixelRatio||1,u=720,b=320;return l.createElement(g,{width:u,height:b,dpr:r,clearColor:"#0b1020",fontFamily:"system-ui"},l.createElement(d,{style:{width:u,height:b,padding:16,flexDirection:"column",gap:10}},l.createElement(n,{text:"Text",style:{fontSize:22,fontWeight:800},color:"#e5e7eb"}),l.createElement(n,{text:"fontSize / fontWeight / lineHeight",style:{fontSize:14,lineHeight:18},color:"rgba(229,231,235,0.75)"}),l.createElement(i,{style:{width:260,height:1},fill:"rgba(255,255,255,0.16)"}),l.createElement(n,{text:"\u5C0F\u53F7\u6587\u672C",style:{fontSize:12},color:"#93c5fd"}),l.createElement(n,{text:"\u4E2D\u53F7\u6587\u672C",style:{fontSize:16,fontWeight:600},color:"#a7f3d0"}),l.createElement(n,{text:"\u5927\u53F7\u6587\u672C",style:{fontSize:24,fontWeight:800},color:"#fca5a5"})))}});case 8:case"end":return o.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-components-text-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 320

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020" fontFamily="system-ui">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 10 }}>
				<Text text="Text" style={{ fontSize: 22, fontWeight: 800 }} color="#e5e7eb" />
				<Text
					text="fontSize / fontWeight / lineHeight"
					style={{ fontSize: 14, lineHeight: 18 }}
					color="rgba(229,231,235,0.75)"
				/>
				<Rect style={{ width: 260, height: 1 }} fill="rgba(255,255,255,0.16)" />
				<Text text="\u5C0F\u53F7\u6587\u672C" style={{ fontSize: 12 }} color="#93c5fd" />
				<Text text="\u4E2D\u53F7\u6587\u672C" style={{ fontSize: 16, fontWeight: 600 }} color="#a7f3d0" />
				<Text text="\u5927\u53F7\u6587\u672C" style={{ fontSize: 24, fontWeight: 800 }} color="#fca5a5" />
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}},"docs-components-text-demo-1":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=a.sent,g=v.Canvas,i=v.Text,n=v.View,a.abrupt("return",{default:function(){var s=typeof window!="undefined"&&window.devicePixelRatio||1,r=720,u=260;return l.createElement(g,{width:r,height:u,dpr:s,clearColor:"#0b1020"},l.createElement(n,{style:{width:r,height:u,padding:16,flexDirection:"column",gap:10}},l.createElement(i,{text:"maxWidth",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),l.createElement(i,{text:"\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u6587\u672C\uFF0C\u7528 maxWidth \u7EA6\u675F\u5BBD\u5EA6\u540E\uFF0C\u4F1A\u89E6\u53D1\u6D4B\u91CF\u4E0E\u6362\u884C\uFF08\u53D6\u51B3\u4E8E\u5F53\u524D\u5B9E\u73B0\u7684\u6D4B\u91CF\u7B56\u7565\uFF09\u3002",style:{fontSize:14,lineHeight:18},maxWidth:360,color:"rgba(229,231,235,0.80)"})))}});case 7:case"end":return a.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-components-text-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 260

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 10 }}>
				<Text text="maxWidth" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<Text
					text="\u8FD9\u662F\u4E00\u6BB5\u8F83\u957F\u7684\u6587\u672C\uFF0C\u7528 maxWidth \u7EA6\u675F\u5BBD\u5EA6\u540E\uFF0C\u4F1A\u89E6\u53D1\u6D4B\u91CF\u4E0E\u6362\u884C\uFF08\u53D6\u51B3\u4E8E\u5F53\u524D\u5B9E\u73B0\u7684\u6D4B\u91CF\u7B56\u7565\uFF09\u3002"
					style={{ fontSize: 14, lineHeight: 18 }}
					maxWidth={360}
					color="rgba(229,231,235,0.80)"
				/>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}}}},78027:function(E,p,t){"use strict";t.r(p),t.d(p,{demos:function(){return _}});var m=t(90819),h=t.n(m),f=t(89933),w=t.n(f),l=t(44194),P=t(9715),_={"docs-components-view-demo-0":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n,d;return h()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=o.sent,g=v.Canvas,i=v.Rect,n=v.Text,d=v.View,o.abrupt("return",{default:function(){var r=typeof window!="undefined"&&window.devicePixelRatio||1,u=720,b=360;return l.createElement(g,{width:u,height:b,dpr:r,clearColor:"#0b1020"},l.createElement(d,{style:{width:u,height:b,padding:18,flexDirection:"column",gap:12},background:"rgba(255,255,255,0.06)",borderRadius:16},l.createElement(n,{text:"View Container",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),l.createElement(d,{style:{flexDirection:"row",gap:12,alignItems:"center"}},l.createElement(i,{style:{width:120,height:52},borderRadius:14,fill:"#22c55e"}),l.createElement(i,{style:{width:160,height:52},borderRadius:14,fill:"#60a5fa"}),l.createElement(i,{style:{flexGrow:1,height:52},borderRadius:14,fill:"rgba(255,255,255,0.10)"}))))}});case 8:case"end":return o.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-components-view-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View
				style={{ width, height, padding: 18, flexDirection: 'column', gap: 12 }}
				background="rgba(255,255,255,0.06)"
				borderRadius={16}
			>
				<Text text="View Container" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Rect style={{ width: 120, height: 52 }} borderRadius={14} fill="#22c55e" />
					<Rect style={{ width: 160, height: 52 }} borderRadius={14} fill="#60a5fa" />
					<Rect
						style={{ flexGrow: 1, height: 52 }}
						borderRadius={14}
						fill="rgba(255,255,255,0.10)"
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}},"docs-components-view-demo-1":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n,d;return h()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=o.sent,g=v.Canvas,i=v.Rect,n=v.Text,d=v.View,o.abrupt("return",{default:function(){var r=typeof window!="undefined"&&window.devicePixelRatio||1,u=720,b=360;return l.createElement(g,{width:u,height:b,dpr:r,clearColor:"#0b1020"},l.createElement(d,{style:{width:u,height:b,padding:18,flexDirection:"column",gap:12}},l.createElement(d,{style:{flexGrow:1,padding:16,flexDirection:"column",gap:12},background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.18)",borderRadius:16},l.createElement(n,{text:"View Border",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),l.createElement(d,{style:{flexDirection:"row",gap:12,alignItems:"center"}},l.createElement(i,{style:{width:120,height:52},borderRadius:14,fill:"#22c55e"}),l.createElement(i,{style:{width:160,height:52},borderRadius:14,fill:"#60a5fa"}),l.createElement(d,{style:{flexGrow:1,height:52},background:"rgba(255,255,255,0.08)",border:"2px solid rgba(96,165,250,0.65)",borderRadius:14})))))}});case 8:case"end":return o.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-components-view-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 18, flexDirection: 'column', gap: 12 }}>
				<View
					style={{ flexGrow: 1, padding: 16, flexDirection: 'column', gap: 12 }}
					background="rgba(255,255,255,0.06)"
					border="1px solid rgba(255,255,255,0.18)"
					borderRadius={16}
				>
					<Text text="View Border" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
					<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
						<Rect style={{ width: 120, height: 52 }} borderRadius={14} fill="#22c55e" />
						<Rect style={{ width: 160, height: 52 }} borderRadius={14} fill="#60a5fa" />
						<View
							style={{ flexGrow: 1, height: 52 }}
							background="rgba(255,255,255,0.08)"
							border="2px solid rgba(96,165,250,0.65)"
							borderRadius={14}
						/>
					</View>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}},"docs-components-view-demo-2":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=a.sent,g=v.Canvas,i=v.View,n=v.Text,a.abrupt("return",{default:function(){var s=typeof window!="undefined"&&window.devicePixelRatio||1,r=720,u=360;return l.createElement(g,{width:r,height:u,dpr:s,clearColor:"#0b1020"},l.createElement(i,{style:{width:r,height:u,padding:18,flexDirection:"row",gap:12,flexWrap:"wrap"}},l.createElement(i,{style:{width:200,height:200},borderRadius:16,background:"#222",backgroundImage:"https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",backgroundSize:"cover",backgroundPosition:"center",border:"2px solid rgba(255,255,255,0.2)"},l.createElement(n,{text:"Cover + Center",style:{fontSize:16,fontWeight:700,padding:12},color:"#fff"})),l.createElement(i,{style:{width:200,height:200},borderRadius:16,background:"#222",backgroundImage:"https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",backgroundSize:"60px",backgroundRepeat:"repeat",border:"2px solid rgba(255,255,255,0.2)"},l.createElement(n,{text:"Repeat",style:{fontSize:16,fontWeight:700,padding:12},color:"#fff"}))))}});case 7:case"end":return a.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-components-view-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, View, Text } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 18, flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
				<View
					style={{ width: 200, height: 200 }}
					borderRadius={16}
					background="#222"
					backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
					backgroundSize="cover"
					backgroundPosition="center"
					border="2px solid rgba(255,255,255,0.2)"
				>
					<Text
						text="Cover + Center"
						style={{ fontSize: 16, fontWeight: 700, padding: 12 }}
						color="#fff"
					/>
				</View>
				<View
					style={{ width: 200, height: 200 }}
					borderRadius={16}
					background="#222"
					backgroundImage="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
					backgroundSize="60px"
					backgroundRepeat="repeat"
					border="2px solid rgba(255,255,255,0.2)"
				>
					<Text text="Repeat" style={{ fontSize: 16, fontWeight: 700, padding: 12 }} color="#fff" />
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}}}},50914:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-controlled-demo-all-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(180),x=l()(M,2),I=x[0],T=x[1],j=u("#60a5fa"),C=l()(j,2),O=C[0],W=C[1],S=u("Rect"),R=l()(S,2),V=R[0],U=R[1];return e.createElement("div",null,e.createElement("div",{style:{flexDirection:"row",gap:12,alignItems:"center",padding:12}},e.createElement("input",{type:"text",value:V,onChange:function(L){return U(L.target.value)}}),e.createElement("input",{type:"range",min:100,max:500,value:I,onChange:function(L){return T(Number(L.target.value))}}),e.createElement("input",{type:"color",value:O,onChange:function(L){return W(L.target.value)}})),e.createElement(d,{width:720,height:320,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:320,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:V,style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12,alignItems:"center"}},e.createElement(a,{style:{width:I,height:64},borderRadius:16,fill:O}),e.createElement(a,{style:{width:I,height:64},fill:"rgba(255,255,255,0.08)",stroke:"#22c55e",lineWidth:3,borderRadius:16}),e.createElement(a,{style:{flexGrow:1,height:64},fill:"rgba(255,255,255,0.10)",borderRadius:16})))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-controlled-demo-all-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [width, setWidth] = useState(180)
	const [color, setColor] = useState('#60a5fa')
	const [textVal, setTextVal] = useState('Rect')
	return (
		<div>
			<div style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 12 }}>
				<input type="text" value={textVal} onChange={(e) => setTextVal(e.target.value)} />
				<input
					type="range"
					min={100}
					max={500}
					value={width}
					onChange={(e) => setWidth(Number(e.target.value))}
				/>
				<input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
			</div>
			<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
					<Text text={textVal} style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
					<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
						<Rect style={{ width: width, height: 64 }} borderRadius={16} fill={color} />
						<Rect
							style={{ width: width, height: 64 }}
							fill="rgba(255,255,255,0.08)"
							stroke="#22c55e"
							lineWidth={3}
							borderRadius={16}
						/>
						<Rect
							style={{ flexGrow: 1, height: 64 }}
							fill="rgba(255,255,255,0.10)"
							borderRadius={16}
						/>
					</View>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-controlled-demo-all-demo-1":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u,b;return f()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=y.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,y.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=y.sent,u=r.useMemo,b=r.useState,y.abrupt("return",{default:function(){var M=typeof window!="undefined"&&window.devicePixelRatio||1,x=b(1),I=l()(x,2),T=I[0],j=I[1],C=b(0),O=l()(C,2),W=O[0],S=O[1],R=b(!0),V=l()(R,2),U=V[0],z=V[1],L=b("green"),K=l()(L,2),N=K[0],A=K[1],B=u(function(){return{width:720,height:320,padding:16,flexDirection:"column",gap:12,overflow:U?"hidden":"visible"}},[U]),G=N==="green"?2:1,J=N==="blue"?2:1;return e.createElement("div",null,e.createElement("div",{style:{flexDirection:"row",gap:12,alignItems:"center",padding:12}},e.createElement("label",{style:{display:"flex",gap:6,alignItems:"center"}},e.createElement("span",{style:{width:70}},"opacity"),e.createElement("input",{type:"range",min:0,max:1,step:.01,value:T,onChange:function($){return j(Number($.target.value))}}),e.createElement("span",{style:{width:50}},T.toFixed(2))),e.createElement("label",{style:{display:"flex",gap:6,alignItems:"center"}},e.createElement("span",{style:{width:70}},"rotate"),e.createElement("input",{type:"range",min:-45,max:45,step:1,value:W,onChange:function($){return S(Number($.target.value))}}),e.createElement("span",{style:{width:50}},W,"\xB0")),e.createElement("label",{style:{display:"flex",gap:6,alignItems:"center"}},e.createElement("input",{type:"checkbox",checked:U,onChange:function($){return z($.target.checked)}}),e.createElement("span",null,"overflow:hidden")),e.createElement("button",{type:"button",onClick:function(){return A(function($){return $==="green"?"blue":"green"})}},"\u5207\u6362\u524D\u666F\uFF08zIndex\uFF09")),e.createElement(d,{width:720,height:320,dpr:M,clearColor:"#0b1020"},e.createElement(s,{style:B,background:"rgba(255,255,255,0.06)",borderRadius:16},e.createElement(o,{text:"transform / opacity / overflow / zIndex",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12}},e.createElement(s,{style:{width:220,height:180}},e.createElement(a,{style:{width:140,height:100,transform:"rotate(".concat(W,"deg) translate(20, 12)"),transformOrigin:"center",opacity:T},fill:"rgba(255,255,255,0.12)",stroke:"rgba(255,255,255,0.35)",lineWidth:2,borderRadius:18}),e.createElement(o,{text:"local transform",style:{marginTop:120,fontSize:12},color:"#94a3b8"})),e.createElement(s,{style:{width:260,height:180},background:"rgba(255,255,255,0.05)",borderRadius:18},e.createElement(a,{style:{width:200,height:140,margin:20,zIndex:G},fill:"rgba(34,197,94,0.55)",borderRadius:18}),e.createElement(a,{style:{width:200,height:140,margin:20,zIndex:J,transform:"translate(30, 20)"},fill:"rgba(96,165,250,0.55)",borderRadius:18}),e.createElement(o,{text:"overlap + zIndex",style:{padding:12,fontSize:12},color:"#e5e7eb"}))))))}});case 13:case"end":return y.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-controlled-demo-all-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [opacity, setOpacity] = useState(1)
	const [deg, setDeg] = useState(0)
	const [overflowHidden, setOverflowHidden] = useState(true)
	const [front, setFront] = useState<'green' | 'blue'>('green')

	const viewStyle = useMemo(
		() => ({
			width: 720,
			height: 320,
			padding: 16,
			flexDirection: 'column' as const,
			gap: 12,
			overflow: overflowHidden ? ('hidden' as const) : ('visible' as const),
		}),
		[overflowHidden],
	)

	const greenZ = front === 'green' ? 2 : 1
	const blueZ = front === 'blue' ? 2 : 1

	return (
		<div>
			<div style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 12 }}>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<span style={{ width: 70 }}>opacity</span>
					<input
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={opacity}
						onChange={(e) => setOpacity(Number(e.target.value))}
					/>
					<span style={{ width: 50 }}>{opacity.toFixed(2)}</span>
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<span style={{ width: 70 }}>rotate</span>
					<input
						type="range"
						min={-45}
						max={45}
						step={1}
						value={deg}
						onChange={(e) => setDeg(Number(e.target.value))}
					/>
					<span style={{ width: 50 }}>{deg}\xB0</span>
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<input
						type="checkbox"
						checked={overflowHidden}
						onChange={(e) => setOverflowHidden(e.target.checked)}
					/>
					<span>overflow:hidden</span>
				</label>
				<button type="button" onClick={() => setFront((v) => (v === 'green' ? 'blue' : 'green'))}>
					\u5207\u6362\u524D\u666F\uFF08zIndex\uFF09
				</button>
			</div>
			<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
				<View style={viewStyle} background="rgba(255,255,255,0.06)" borderRadius={16}>
					<Text
						text="transform / opacity / overflow / zIndex"
						style={{ fontSize: 18, fontWeight: 700 }}
						color="#e5e7eb"
					/>
					<View style={{ flexDirection: 'row', gap: 12 }}>
						<View style={{ width: 220, height: 180 }}>
							<Rect
								style={{
									width: 140,
									height: 100,
									transform: \`rotate(\${deg}deg) translate(20, 12)\`,
									transformOrigin: 'center',
									opacity,
								}}
								fill="rgba(255,255,255,0.12)"
								stroke="rgba(255,255,255,0.35)"
								lineWidth={2}
								borderRadius={18}
							/>
							<Text
								text="local transform"
								style={{ marginTop: 120, fontSize: 12 }}
								color="#94a3b8"
							/>
						</View>

						<View
							style={{ width: 260, height: 180 }}
							background="rgba(255,255,255,0.05)"
							borderRadius={18}
						>
							<Rect
								style={{ width: 200, height: 140, margin: 20, zIndex: greenZ }}
								fill="rgba(34,197,94,0.55)"
								borderRadius={18}
							/>
							<Rect
								style={{
									width: 200,
									height: 140,
									margin: 20,
									zIndex: blueZ,
									transform: 'translate(30, 20)',
								}}
								fill="rgba(96,165,250,0.55)"
								borderRadius={18}
							/>
							<Text text="overlap + zIndex" style={{ padding: 12, fontSize: 12 }} color="#e5e7eb" />
						</View>
					</View>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},56195:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-controlled-demo-color-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(180),x=l()(M,2),I=x[0],T=x[1],j=u("#60a5fa"),C=l()(j,2),O=C[0],W=C[1],S=u("Rect"),R=l()(S,2),V=R[0],U=R[1];return e.createElement("div",null,e.createElement("div",{style:{flexDirection:"row",gap:12,alignItems:"center",padding:12}},e.createElement("input",{type:"color",value:O,onChange:function(L){return W(L.target.value)}})),e.createElement(d,{width:720,height:320,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:320,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:V,style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12,alignItems:"center"}},e.createElement(a,{style:{width:I,height:64},borderRadius:16,fill:O}),e.createElement(a,{style:{width:I,height:64},borderRadius:16,fill:"rgba(255,255,255,0.08)",stroke:"#22c55e",lineWidth:3}),e.createElement(a,{style:{flexGrow:1,height:64},borderRadius:16,fill:"rgba(255,255,255,0.10)"})))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-controlled-demo-color-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [width, setWidth] = useState(180)
	const [color, setColor] = useState('#60a5fa')
	const [textVal, setTextVal] = useState('Rect')
	return (
		<div>
			<div style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 12 }}>
				<input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
			</div>
			<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
					<Text text={textVal} style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
					<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
						<Rect style={{ width: width, height: 64 }} borderRadius={16} fill={color} />
						<Rect
							style={{ width: width, height: 64 }}
							borderRadius={16}
							fill="rgba(255,255,255,0.08)"
							stroke="#22c55e"
							lineWidth={3}
						/>
						<Rect
							style={{ flexGrow: 1, height: 64 }}
							borderRadius={16}
							fill="rgba(255,255,255,0.10)"
						/>
					</View>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},43759:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-controlled-demo-opacity-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(.8),x=l()(M,2),I=x[0],T=x[1];return e.createElement("div",null,e.createElement("div",{style:{display:"flex",gap:12,alignItems:"center",padding:12}},e.createElement("span",{style:{width:80}},"Opacity"),e.createElement("input",{type:"range",min:0,max:1,step:.01,value:I,onChange:function(C){return T(Number(C.target.value))}}),e.createElement("span",null,I.toFixed(2))),e.createElement(d,{width:720,height:360,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:360,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}},e.createElement(s,{style:{alignItems:"center",gap:10}},e.createElement(a,{style:{width:120,height:120,opacity:I},fill:"#ef4444",borderRadius:20}),e.createElement(o,{text:"Rect",color:"#ffffff"})),e.createElement(s,{style:{alignItems:"center",gap:10}},e.createElement(s,{style:{width:120,height:120,opacity:I},background:"#10b981",borderRadius:20},e.createElement(a,{style:{width:40,height:40,margin:40},fill:"#ffffff"})),e.createElement(o,{text:"View (Container)",color:"#ffffff"})),e.createElement(s,{style:{alignItems:"center",gap:10}},e.createElement(o,{text:"Hello Canvas",style:{fontSize:24,fontWeight:700,opacity:I},color:"#6366f1"}),e.createElement(o,{text:"Text",color:"#ffffff"})))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-controlled-demo-opacity-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View, Image } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [opacity, setOpacity] = useState(0.8)

	return (
		<div>
			<div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12 }}>
				<span style={{ width: 80 }}>Opacity</span>
				<input
					type="range"
					min={0}
					max={1}
					step={0.01}
					value={opacity}
					onChange={(e) => setOpacity(Number(e.target.value))}
				/>
				<span>{opacity.toFixed(2)}</span>
			</div>
			<Canvas width={720} height={360} dpr={dpr} clearColor="#0b1020">
				<View
					style={{
						width: 720,
						height: 360,
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					<View style={{ alignItems: 'center', gap: 10 }}>
						<Rect style={{ width: 120, height: 120, opacity }} fill="#ef4444" borderRadius={20} />
						<Text text="Rect" color="#ffffff" />
					</View>

					<View style={{ alignItems: 'center', gap: 10 }}>
						<View
							style={{ width: 120, height: 120, opacity }}
							background="#10b981"
							borderRadius={20}
						>
							<Rect style={{ width: 40, height: 40, margin: 40 }} fill="#ffffff" />
						</View>
						<Text text="View (Container)" color="#ffffff" />
					</View>

					<View style={{ alignItems: 'center', gap: 10 }}>
						<Text
							text="Hello Canvas"
							style={{ fontSize: 24, fontWeight: 700, opacity }}
							color="#6366f1"
						/>
						<Text text="Text" color="#ffffff" />
					</View>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},70458:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-controlled-demo-overflow-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(40),x=l()(M,2),I=x[0],T=x[1],j=u(!0),C=l()(j,2),O=C[0],W=C[1];function S(R){return e.createElement(s,{style:{alignItems:"center",gap:10}},e.createElement(o,{text:R.title,color:"rgba(229,231,235,0.92)",style:{fontSize:14,fontWeight:700}}),e.createElement(s,{style:{width:240,height:240,overflow:R.overflow},background:"rgba(30,41,59,1)",border:"2px solid rgba(148,163,184,0.55)",borderRadius:I},e.createElement(a,{style:{position:"absolute",left:-60,top:70,width:360,height:90,transform:"rotate(18deg)"},fill:"rgba(59,130,246,0.75)"}),e.createElement(a,{style:{position:"absolute",left:-40,top:-40,width:130,height:130},fill:"rgba(239,68,68,0.88)"}),e.createElement(a,{style:{position:"absolute",right:-60,bottom:-35,width:170,height:120,transform:"rotate(-10deg)"},fill:"rgba(234,179,8,0.82)"}),e.createElement(o,{text:"OUT",color:"rgba(255,255,255,0.95)",style:{position:"absolute",left:6,top:6,fontSize:16,fontWeight:900}}),e.createElement(s,{style:{position:"absolute",left:0,right:0,top:0,bottom:0,justifyContent:"center",alignItems:"center"}},e.createElement(o,{text:R.overflow==="hidden"?"CLIPPED":"OVERFLOW",color:"rgba(15,23,42,0.95)",style:{fontSize:18,fontWeight:900}}))))}return e.createElement("div",null,e.createElement("div",{style:{display:"flex",gap:20,alignItems:"center",padding:12}},e.createElement("label",{style:{display:"flex",gap:6,alignItems:"center"}},e.createElement("span",null,"Border Radius"),e.createElement("input",{type:"range",min:0,max:100,value:I,onChange:function(V){return T(Number(V.target.value))}}),e.createElement("span",null,I,"px")),e.createElement("label",{style:{display:"flex",gap:6,alignItems:"center"}},e.createElement("input",{type:"checkbox",checked:O,onChange:function(V){return W(V.target.checked)}}),e.createElement("span",null,"overflow: hidden"))),e.createElement(d,{width:720,height:400,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:400,justifyContent:"center",alignItems:"center"}},e.createElement(s,{style:{flexDirection:"row",gap:28,alignItems:"flex-start"}},e.createElement(S,{title:"overflow: visible\uFF08\u5BF9\u7167\uFF09",overflow:"visible"}),e.createElement(S,{title:O?"overflow: hidden\uFF08\u88C1\u526A\uFF09":"overflow: visible\uFF08\u672A\u88C1\u526A\uFF09",overflow:O?"hidden":"visible"})),e.createElement(o,{text:"\u628A\u5706\u89D2\u8C03\u5927\u65F6\uFF0C\u53F3\u4FA7\u7EA2/\u9EC4\u5757\u5728\u5706\u89D2\u5904\u4F1A\u88AB\u660E\u663E\u88C1\u6389\uFF08overflow:hidden\uFF09",style:{marginTop:22,fontSize:13,maxWidth:640},color:"rgba(148,163,184,0.9)"}))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-controlled-demo-overflow-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [radius, setRadius] = useState(40)
	const [overflow, setOverflow] = useState(true)

	function Card(props: { title: string; overflow: 'visible' | 'hidden' }) {
		return (
			<View style={{ alignItems: 'center', gap: 10 }}>
				<Text
					text={props.title}
					color="rgba(229,231,235,0.92)"
					style={{ fontSize: 14, fontWeight: 700 }}
				/>
				<View
					style={{
						width: 240,
						height: 240,
						overflow: props.overflow,
					}}
					background="rgba(30,41,59,1)"
					border="2px solid rgba(148,163,184,0.55)"
					borderRadius={radius}
				>
					<Rect
						style={{
							position: 'absolute',
							left: -60,
							top: 70,
							width: 360,
							height: 90,
							transform: 'rotate(18deg)',
						}}
						fill="rgba(59,130,246,0.75)"
					/>
					<Rect
						style={{
							position: 'absolute',
							left: -40,
							top: -40,
							width: 130,
							height: 130,
						}}
						fill="rgba(239,68,68,0.88)"
					/>
					<Rect
						style={{
							position: 'absolute',
							right: -60,
							bottom: -35,
							width: 170,
							height: 120,
							transform: 'rotate(-10deg)',
						}}
						fill="rgba(234,179,8,0.82)"
					/>
					<Text
						text="OUT"
						color="rgba(255,255,255,0.95)"
						style={{
							position: 'absolute',
							left: 6,
							top: 6,
							fontSize: 16,
							fontWeight: 900,
						}}
					/>
					<View
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Text
							text={props.overflow === 'hidden' ? 'CLIPPED' : 'OVERFLOW'}
							color="rgba(15,23,42,0.95)"
							style={{ fontSize: 18, fontWeight: 900 }}
						/>
					</View>
				</View>
			</View>
		)
	}

	return (
		<div>
			<div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 12 }}>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<span>Border Radius</span>
					<input
						type="range"
						min={0}
						max={100}
						value={radius}
						onChange={(e) => setRadius(Number(e.target.value))}
					/>
					<span>{radius}px</span>
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<input
						type="checkbox"
						checked={overflow}
						onChange={(e) => setOverflow(e.target.checked)}
					/>
					<span>overflow: hidden</span>
				</label>
			</div>
			<Canvas width={720} height={400} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 400, justifyContent: 'center', alignItems: 'center' }}>
					<View style={{ flexDirection: 'row', gap: 28, alignItems: 'flex-start' }}>
						<Card title="overflow: visible\uFF08\u5BF9\u7167\uFF09" overflow="visible" />
						<Card
							title={overflow ? 'overflow: hidden\uFF08\u88C1\u526A\uFF09' : 'overflow: visible\uFF08\u672A\u88C1\u526A\uFF09'}
							overflow={overflow ? 'hidden' : 'visible'}
						/>
					</View>
					<Text
						text="\u628A\u5706\u89D2\u8C03\u5927\u65F6\uFF0C\u53F3\u4FA7\u7EA2/\u9EC4\u5757\u5728\u5706\u89D2\u5904\u4F1A\u88AB\u660E\u663E\u88C1\u6389\uFF08overflow:hidden\uFF09"
						style={{ marginTop: 22, fontSize: 13, maxWidth: 640 }}
						color="rgba(148,163,184,0.9)"
					/>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},4032:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-controlled-demo-transform-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(0),x=l()(M,2),I=x[0],T=x[1],j=u(0),C=l()(j,2),O=C[0],W=C[1],S=u(1),R=l()(S,2),V=R[0],U=R[1],z=u(0),L=l()(z,2),K=L[0],N=L[1];return e.createElement("div",null,e.createElement("div",{style:{display:"flex",flexDirection:"column",gap:8,padding:12}},e.createElement("div",{style:{display:"flex",gap:12,alignItems:"center"}},e.createElement("span",{style:{width:80}},"Translate X"),e.createElement("input",{type:"range",min:-50,max:50,value:I,onChange:function(B){return T(Number(B.target.value))}}),e.createElement("span",null,I,"px")),e.createElement("div",{style:{display:"flex",gap:12,alignItems:"center"}},e.createElement("span",{style:{width:80}},"Translate Y"),e.createElement("input",{type:"range",min:-50,max:50,value:O,onChange:function(B){return W(Number(B.target.value))}}),e.createElement("span",null,O,"px")),e.createElement("div",{style:{display:"flex",gap:12,alignItems:"center"}},e.createElement("span",{style:{width:80}},"Scale"),e.createElement("input",{type:"range",min:.5,max:2,step:.1,value:V,onChange:function(B){return U(Number(B.target.value))}}),e.createElement("span",null,V.toFixed(1),"x")),e.createElement("div",{style:{display:"flex",gap:12,alignItems:"center"}},e.createElement("span",{style:{width:80}},"Rotate"),e.createElement("input",{type:"range",min:0,max:360,value:K,onChange:function(B){return N(Number(B.target.value))}}),e.createElement("span",null,K,"\xB0"))),e.createElement(d,{width:720,height:360,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:360,justifyContent:"center",alignItems:"center"}},e.createElement(a,{style:{width:120,height:120,transform:"translate(".concat(I,", ").concat(O,") scale(").concat(V,") rotate(").concat(K,"deg)"),transformOrigin:"center"},fill:"#3b82f6",borderRadius:20,onPointerDown:function(){return console.log("Rect clicked!")}}),e.createElement(o,{text:"Click me (Hit Test)",style:{marginTop:20},color:"#ffffff"}))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-controlled-demo-transform-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [tx, setTx] = useState(0)
	const [ty, setTy] = useState(0)
	const [scale, setScale] = useState(1)
	const [rotate, setRotate] = useState(0)

	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12 }}>
				<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					<span style={{ width: 80 }}>Translate X</span>
					<input
						type="range"
						min={-50}
						max={50}
						value={tx}
						onChange={(e) => setTx(Number(e.target.value))}
					/>
					<span>{tx}px</span>
				</div>
				<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					<span style={{ width: 80 }}>Translate Y</span>
					<input
						type="range"
						min={-50}
						max={50}
						value={ty}
						onChange={(e) => setTy(Number(e.target.value))}
					/>
					<span>{ty}px</span>
				</div>
				<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					<span style={{ width: 80 }}>Scale</span>
					<input
						type="range"
						min={0.5}
						max={2}
						step={0.1}
						value={scale}
						onChange={(e) => setScale(Number(e.target.value))}
					/>
					<span>{scale.toFixed(1)}x</span>
				</div>
				<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					<span style={{ width: 80 }}>Rotate</span>
					<input
						type="range"
						min={0}
						max={360}
						value={rotate}
						onChange={(e) => setRotate(Number(e.target.value))}
					/>
					<span>{rotate}\xB0</span>
				</div>
			</div>
			<Canvas width={720} height={360} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 360, justifyContent: 'center', alignItems: 'center' }}>
					<Rect
						style={{
							width: 120,
							height: 120,
							transform: \`translate(\${tx}, \${ty}) scale(\${scale}) rotate(\${rotate}deg)\`,
							transformOrigin: 'center',
						}}
						fill="#3b82f6"
						borderRadius={20}
						onPointerDown={() => console.log('Rect clicked!')}
					/>
					<Text text="Click me (Hit Test)" style={{ marginTop: 20 }} color="#ffffff" />
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},78373:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-controlled-demo-txt-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(180),x=l()(M,2),I=x[0],T=x[1],j=u("#60a5fa"),C=l()(j,2),O=C[0],W=C[1],S=u("Rect"),R=l()(S,2),V=R[0],U=R[1];return e.createElement("div",null,e.createElement("div",{style:{flexDirection:"row",gap:12,alignItems:"center",padding:12}},e.createElement("input",{type:"text",value:V,onChange:function(L){return U(L.target.value)}})),e.createElement(d,{width:720,height:320,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:320,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:V,style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12,alignItems:"center"}},e.createElement(a,{style:{width:I,height:64},borderRadius:16,fill:O}),e.createElement(a,{style:{width:I,height:64},borderRadius:16,fill:"rgba(255,255,255,0.08)",stroke:"#22c55e",lineWidth:3}),e.createElement(a,{style:{flexGrow:1,height:64},borderRadius:16,fill:"rgba(255,255,255,0.10)"})))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-controlled-demo-txt-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [width, setWidth] = useState(180)
	const [color, setColor] = useState('#60a5fa')
	const [textVal, setTextVal] = useState('Rect')
	return (
		<div>
			<div style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 12 }}>
				<input type="text" value={textVal} onChange={(e) => setTextVal(e.target.value)} />
			</div>
			<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
					<Text text={textVal} style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
					<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
						<Rect style={{ width: width, height: 64 }} borderRadius={16} fill={color} />
						<Rect
							style={{ width: width, height: 64 }}
							borderRadius={16}
							fill="rgba(255,255,255,0.08)"
							stroke="#22c55e"
							lineWidth={3}
						/>
						<Rect
							style={{ flexGrow: 1, height: 64 }}
							borderRadius={16}
							fill="rgba(255,255,255,0.10)"
						/>
					</View>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},19040:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-controlled-demo-width-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(180),x=l()(M,2),I=x[0],T=x[1],j=u("#60a5fa"),C=l()(j,2),O=C[0],W=C[1],S=u("Rect"),R=l()(S,2),V=R[0],U=R[1];return e.createElement("div",null,e.createElement("div",{style:{flexDirection:"row",gap:12,alignItems:"center",padding:12}},e.createElement("input",{type:"range",min:100,max:500,value:I,onChange:function(L){return T(Number(L.target.value))}})),e.createElement(d,{width:720,height:320,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:320,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:V,style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12,alignItems:"center"}},e.createElement(a,{style:{width:I,height:64},borderRadius:16,fill:O}),e.createElement(a,{style:{width:I,height:64},borderRadius:16,fill:"rgba(255,255,255,0.08)",stroke:"#22c55e",lineWidth:3}),e.createElement(a,{style:{flexGrow:1,height:64},borderRadius:16,fill:"rgba(255,255,255,0.10)"})))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-controlled-demo-width-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [width, setWidth] = useState(180)
	const [color, setColor] = useState('#60a5fa')
	const [textVal, setTextVal] = useState('Rect')
	return (
		<div>
			<div style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 12 }}>
				<input
					type="range"
					min={100}
					max={500}
					value={width}
					onChange={(e) => setWidth(Number(e.target.value))}
				/>
			</div>
			<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
					<Text text={textVal} style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
					<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
						<Rect style={{ width: width, height: 64 }} borderRadius={16} fill={color} />
						<Rect
							style={{ width: width, height: 64 }}
							borderRadius={16}
							fill="rgba(255,255,255,0.08)"
							stroke="#22c55e"
							lineWidth={3}
						/>
						<Rect
							style={{ flexGrow: 1, height: 64 }}
							borderRadius={16}
							fill="rgba(255,255,255,0.10)"
						/>
					</View>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},29669:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-controlled-demo-z-index-demo-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(1),x=l()(M,2),I=x[0],T=x[1],j=u(2),C=l()(j,2),O=C[0],W=C[1],S=u(3),R=l()(S,2),V=R[0],U=R[1];return e.createElement("div",null,e.createElement("div",{style:{display:"flex",gap:12,alignItems:"center",padding:12}},e.createElement("label",null,"Red Z:"," ",e.createElement("input",{type:"number",value:I,onChange:function(L){return T(Number(L.target.value))},style:{width:50}})),e.createElement("label",null,"Green Z:"," ",e.createElement("input",{type:"number",value:O,onChange:function(L){return W(Number(L.target.value))},style:{width:50}})),e.createElement("label",null,"Blue Z:"," ",e.createElement("input",{type:"number",value:V,onChange:function(L){return U(Number(L.target.value))},style:{width:50}}))),e.createElement(d,{width:720,height:360,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:360,position:"relative"}},e.createElement(a,{style:{position:"absolute",top:105,left:285,width:150,height:150,zIndex:I,transform:"translate(-40, -40)"},fill:"#ef4444",borderRadius:20}),e.createElement(a,{style:{position:"absolute",top:105,left:285,width:150,height:150,zIndex:O,transform:"translate(0, 0)"},fill:"#10b981",borderRadius:20}),e.createElement(a,{style:{position:"absolute",top:105,left:285,width:150,height:150,zIndex:V,transform:"translate(40, 40)"},fill:"#3b82f6",borderRadius:20}),e.createElement(o,{text:"Red: ".concat(I,", Green: ").concat(O,", Blue: ").concat(V),style:{position:"absolute",left:12,bottom:12},color:"#ffffff"}))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-controlled-demo-z-index-demo-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [redZ, setRedZ] = useState(1)
	const [greenZ, setGreenZ] = useState(2)
	const [blueZ, setBlueZ] = useState(3)

	return (
		<div>
			<div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12 }}>
				<label>
					Red Z:{' '}
					<input
						type="number"
						value={redZ}
						onChange={(e) => setRedZ(Number(e.target.value))}
						style={{ width: 50 }}
					/>
				</label>
				<label>
					Green Z:{' '}
					<input
						type="number"
						value={greenZ}
						onChange={(e) => setGreenZ(Number(e.target.value))}
						style={{ width: 50 }}
					/>
				</label>
				<label>
					Blue Z:{' '}
					<input
						type="number"
						value={blueZ}
						onChange={(e) => setBlueZ(Number(e.target.value))}
						style={{ width: 50 }}
					/>
				</label>
			</div>
			<Canvas width={720} height={360} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 360, position: 'relative' }}>
					<Rect
						style={{
							position: 'absolute',
							top: 105,
							left: 285,
							width: 150,
							height: 150,
							zIndex: redZ,
							transform: 'translate(-40, -40)',
						}}
						fill="#ef4444"
						borderRadius={20}
					/>
					<Rect
						style={{
							position: 'absolute',
							top: 105,
							left: 285,
							width: 150,
							height: 150,
							zIndex: greenZ,
							transform: 'translate(0, 0)',
						}}
						fill="#10b981"
						borderRadius={20}
					/>
					<Rect
						style={{
							position: 'absolute',
							top: 105,
							left: 285,
							width: 150,
							height: 150,
							zIndex: blueZ,
							transform: 'translate(40, 40)',
						}}
						fill="#3b82f6"
						borderRadius={20}
					/>
					<Text
						text={\`Red: \${redZ}, Green: \${greenZ}, Blue: \${blueZ}\`}
						style={{ position: 'absolute', left: 12, bottom: 12 }}
						color="#ffffff"
					/>
				</View>
			</Canvas>
		</div>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},34861:function(E,p,t){"use strict";t.r(p),t.d(p,{demos:function(){return h}});var m=t(44194),h={}},94932:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-guide-events-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(!1),x=l()(M,2),I=x[0],T=x[1];return e.createElement(d,{width:720,height:260,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:260,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:I?"onClick: ACTIVE":"onClick: INACTIVE",style:{fontSize:18,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{style:{flexDirection:"row",gap:12,alignItems:"center"}},e.createElement(a,{style:{width:220,height:54},borderRadius:14,fill:I?"#22c55e":"#ef4444",onClick:function(){return T(function(C){return!C})}}),e.createElement(o,{text:"\u70B9\u51FB\u5DE6\u4FA7\u8272\u5757\u5207\u6362\u72B6\u6001",style:{fontSize:14},color:"rgba(229,231,235,0.75)"}))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-events-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [active, setActive] = useState(false)

	return (
		<Canvas width={720} height={260} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 260, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={active ? 'onClick: ACTIVE' : 'onClick: INACTIVE'}
					style={{ fontSize: 18, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Rect
						style={{ width: 220, height: 54 }}
						borderRadius={14}
						fill={active ? '#22c55e' : '#ef4444'}
						onClick={() => setActive((v) => !v)}
					/>
					<Text
						text="\u70B9\u51FB\u5DE6\u4FA7\u8272\u5757\u5207\u6362\u72B6\u6001"
						style={{ fontSize: 14 }}
						color="rgba(229,231,235,0.75)"
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-guide-events-demo-1":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(!1),x=l()(M,2),I=x[0],T=x[1];return e.createElement(d,{width:720,height:260,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:260,justifyContent:"center",alignItems:"center"}},e.createElement(a,{style:{width:200,height:200},borderRadius:24,fill:I?"#3b82f6":"#1e293b",onPointerEnter:function(){return T(!0)},onPointerLeave:function(){return T(!1)}},e.createElement(s,{style:{width:200,height:200,justifyContent:"center",alignItems:"center"}},e.createElement(o,{text:I?"Hovered!":"Hover Me",style:{fontSize:24,fontWeight:700},color:I?"#ffffff":"#94a3b8"})))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-events-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function HoverDemo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [hovered, setHovered] = useState(false)

	return (
		<Canvas width={720} height={260} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 260, justifyContent: 'center', alignItems: 'center' }}>
				<Rect
					style={{ width: 200, height: 200 }}
					borderRadius={24}
					fill={hovered ? '#3b82f6' : '#1e293b'}
					onPointerEnter={() => setHovered(true)}
					onPointerLeave={() => setHovered(false)}
				>
					<View style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>
						<Text
							text={hovered ? 'Hovered!' : 'Hover Me'}
							style={{ fontSize: 24, fontWeight: 700 }}
							color={hovered ? '#ffffff' : '#94a3b8'}
						/>
					</View>
				</Rect>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-guide-events-demo-2":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u,b;return f()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=y.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,y.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=y.sent,u=r.useMemo,b=r.useState,y.abrupt("return",{default:function(){var M=typeof window!="undefined"&&window.devicePixelRatio||1,x=720,I=320,T=b(!1),j=l()(T,2),C=j[0],O=j[1],W=b({x:80,y:120}),S=l()(W,2),R=S[0],V=S[1],U=b({x:0,y:0}),z=l()(U,2),L=z[0],K=z[1],N=u(function(){return C?"Dragging\u2026":"Drag the orange rect"},[C]);return e.createElement(d,{width:x,height:I,dpr:M,clearColor:"#0b1020"},e.createElement(s,{style:{width:x,height:I,padding:16,position:"relative"}},e.createElement(o,{text:N,style:{fontSize:16,fontWeight:700},color:"#e5e7eb"}),e.createElement(a,{style:{position:"absolute",left:R.x,top:R.y,width:200,height:54},borderRadius:14,fill:"#f59e0b",onPointerDown:function(B){O(!0),K({x:B.x-R.x,y:B.y-R.y})},onPointerMove:function(B){C&&V({x:B.x-L.x,y:B.y-L.y})},onPointerUp:function(){return O(!1)},onPointerCancel:function(){return O(!1)}})))}});case 13:case"end":return y.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-events-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 320

	const [dragging, setDragging] = useState(false)
	const [pos, setPos] = useState({ x: 80, y: 120 })
	const [offset, setOffset] = useState({ x: 0, y: 0 })

	const label = useMemo(() => {
		return dragging ? 'Dragging\u2026' : 'Drag the orange rect'
	}, [dragging])

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, position: 'relative' }}>
				<Text text={label} style={{ fontSize: 16, fontWeight: 700 }} color="#e5e7eb" />
				<Rect
					style={{ position: 'absolute', left: pos.x, top: pos.y, width: 200, height: 54 }}
					borderRadius={14}
					fill="#f59e0b"
					onPointerDown={(e) => {
						setDragging(true)
						setOffset({ x: e.x - pos.x, y: e.y - pos.y })
					}}
					onPointerMove={(e) => {
						if (!dragging) return
						setPos({ x: e.x - offset.x, y: e.y - offset.y })
					}}
					onPointerUp={() => setDragging(false)}
					onPointerCancel={() => setDragging(false)}
				/>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-guide-events-demo-3":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u;return f()().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=c.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,c.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=c.sent,u=r.useState,c.abrupt("return",{default:function(){var D=typeof window!="undefined"&&window.devicePixelRatio||1,M=u(0),x=l()(M,2),I=x[0],T=x[1];return e.createElement(d,{width:720,height:260,dpr:D,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:260,justifyContent:"center",alignItems:"center"}},e.createElement(s,{style:{width:360,height:180,position:"relative"}},e.createElement(a,{style:{position:"absolute",left:60,top:40,width:220,height:100},borderRadius:16,fill:"#22c55e",onClick:function(){return T(function(C){return C+1})}}),e.createElement(a,{style:{position:"absolute",left:120,top:70,width:220,height:100},borderRadius:16,fill:"rgba(96,165,250,0.25)",stroke:"rgba(96,165,250,0.9)",lineWidth:2,pointerEvents:"none"}),e.createElement(o,{text:"Click count: ".concat(I,"\uFF08\u70B9\u51FB\u84DD\u8272\u534A\u900F\u660E\u533A\u57DF\u4E5F\u4F1A\u89E6\u53D1\u5E95\u90E8\u7EFF\u8272\uFF09"),style:{position:"absolute",left:0,top:0,fontSize:12},color:"rgba(229,231,235,0.85)",maxWidth:360}))))}});case 12:case"end":return c.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-events-demo-3",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [count, setCount] = useState(0)

	return (
		<Canvas width={720} height={260} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 260, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ width: 360, height: 180, position: 'relative' }}>
					<Rect
						style={{ position: 'absolute', left: 60, top: 40, width: 220, height: 100 }}
						borderRadius={16}
						fill="#22c55e"
						onClick={() => setCount((v) => v + 1)}
					/>
					<Rect
						style={{ position: 'absolute', left: 120, top: 70, width: 220, height: 100 }}
						borderRadius={16}
						fill="rgba(96,165,250,0.25)"
						stroke="rgba(96,165,250,0.9)"
						lineWidth={2}
						pointerEvents="none"
					/>
					<Text
						text={\`Click count: \${count}\uFF08\u70B9\u51FB\u84DD\u8272\u534A\u900F\u660E\u533A\u57DF\u4E5F\u4F1A\u89E6\u53D1\u5E95\u90E8\u7EFF\u8272\uFF09\`}
						style={{ position: 'absolute', left: 0, top: 0, fontSize: 12 }}
						color="rgba(229,231,235,0.85)"
						maxWidth={360}
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},80608:function(E,p,t){"use strict";t.r(p),t.d(p,{demos:function(){return _}});var m=t(90819),h=t.n(m),f=t(89933),w=t.n(f),l=t(44194),P=t(9715),_={"docs-guide-getting-started-demo-0":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n,d,a;return h()().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=s.sent,g=v.Canvas,i=v.Circle,n=v.Rect,d=v.Text,a=v.View,s.abrupt("return",{default:function(){var u=typeof window!="undefined"&&window.devicePixelRatio||1,b=720,c=380;return l.createElement(g,{width:b,height:c,dpr:u,clearColor:"#0b1020",style:{borderRadius:12,border:"1px solid rgba(255,255,255,0.12)"}},l.createElement(a,{style:{width:b,height:c,padding:18,flexDirection:"column",gap:12,justifyContent:"space-between"}},l.createElement(a,{style:{flexDirection:"column",gap:8}},l.createElement(d,{text:"Canvas Renderer",style:{fontSize:22,fontWeight:700},color:"#e5e7eb"}),l.createElement(d,{text:"\u7528 JSX \u58F0\u660E\u56FE\u5143\u6811\uFF0CReact \u8D1F\u8D23 diff\uFF0Crenderer \u5728 commit \u540E layout -> draw\u3002",style:{fontSize:14,lineHeight:18,maxWidth:520},color:"rgba(229,231,235,0.75)"})),l.createElement(a,{style:{flexDirection:"row",gap:10,alignItems:"center"}},l.createElement(n,{style:{width:180,height:44},borderRadius:12,fill:"#22c55e"}),l.createElement(n,{style:{width:120,height:44},borderRadius:12,fill:"#60a5fa"}),l.createElement(i,{style:{width:44,height:44},fill:"#f59e0b"}),l.createElement(n,{style:{flexGrow:1,height:44},borderRadius:12,fill:"rgba(255,255,255,0.10)"}))))}});case 9:case"end":return s.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-guide-getting-started-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Circle, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 380

	return (
		<Canvas
			width={width}
			height={height}
			dpr={dpr}
			clearColor="#0b1020"
			style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}
		>
			<View
				style={{
					width,
					height,
					padding: 18,
					flexDirection: 'column',
					gap: 12,
					justifyContent: 'space-between',
				}}
			>
				<View style={{ flexDirection: 'column', gap: 8 }}>
					<Text text="Canvas Renderer" style={{ fontSize: 22, fontWeight: 700 }} color="#e5e7eb" />
					<Text
						text="\u7528 JSX \u58F0\u660E\u56FE\u5143\u6811\uFF0CReact \u8D1F\u8D23 diff\uFF0Crenderer \u5728 commit \u540E layout -> draw\u3002"
						style={{ fontSize: 14, lineHeight: 18, maxWidth: 520 }}
						color="rgba(229,231,235,0.75)"
					/>
				</View>

				<View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
					<Rect style={{ width: 180, height: 44 }} borderRadius={12} fill="#22c55e" />
					<Rect style={{ width: 120, height: 44 }} borderRadius={12} fill="#60a5fa" />
					<Circle style={{ width: 44, height: 44 }} fill="#f59e0b" />
					<Rect
						style={{ flexGrow: 1, height: 44 }}
						borderRadius={12}
						fill="rgba(255,255,255,0.10)"
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}}}},67782:function(E,p,t){"use strict";t.r(p),t.d(p,{demos:function(){return _}});var m=t(90819),h=t.n(m),f=t(89933),w=t.n(f),l=t(44194),P=t(9715),_={"docs-guide-layout-demo-0":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n,d;return h()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=o.sent,g=v.Canvas,i=v.Rect,n=v.Text,d=v.View,o.abrupt("return",{default:function(){var r=typeof window!="undefined"&&window.devicePixelRatio||1,u=720,b=360;return l.createElement(g,{width:u,height:b,dpr:r,clearColor:"#0b1020"},l.createElement(d,{style:{width:u,height:b,padding:16,flexDirection:"column",gap:12}},l.createElement(n,{text:"Row + gap",style:{fontSize:16,fontWeight:700},color:"#e5e7eb"}),l.createElement(d,{style:{flexDirection:"row",gap:12,alignItems:"center"}},l.createElement(i,{style:{width:140,height:52},borderRadius:12,fill:"#60a5fa"}),l.createElement(i,{style:{flexGrow:1,height:52},borderRadius:12,fill:"rgba(255,255,255,0.10)"}),l.createElement(i,{style:{width:90,height:52},borderRadius:12,fill:"#22c55e"})),l.createElement(n,{text:"Column + justifyContent",style:{fontSize:16,fontWeight:700},color:"#e5e7eb"}),l.createElement(d,{style:{flexGrow:1,padding:12,flexDirection:"column",justifyContent:"space-between"},background:"rgba(255,255,255,0.06)",borderRadius:12},l.createElement(n,{text:"Top",style:{fontSize:14},color:"rgba(229,231,235,0.9)"}),l.createElement(n,{text:"Bottom",style:{fontSize:14},color:"rgba(229,231,235,0.9)"}))))}});case 8:case"end":return o.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-guide-layout-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Row + gap" style={{ fontSize: 16, fontWeight: 700 }} color="#e5e7eb" />

				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Rect style={{ width: 140, height: 52 }} borderRadius={12} fill="#60a5fa" />
					<Rect
						style={{ flexGrow: 1, height: 52 }}
						borderRadius={12}
						fill="rgba(255,255,255,0.10)"
					/>
					<Rect style={{ width: 90, height: 52 }} borderRadius={12} fill="#22c55e" />
				</View>

				<Text
					text="Column + justifyContent"
					style={{ fontSize: 16, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<View
					style={{
						flexGrow: 1,
						padding: 12,
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
					background="rgba(255,255,255,0.06)"
					borderRadius={12}
				>
					<Text text="Top" style={{ fontSize: 14 }} color="rgba(229,231,235,0.9)" />
					<Text text="Bottom" style={{ fontSize: 14 }} color="rgba(229,231,235,0.9)" />
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}},"docs-guide-layout-demo-1":{component:l.memo(l.lazy(w()(h()().mark(function e(){var v,g,i,n,d;return h()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return v=o.sent,g=v.Canvas,i=v.Rect,n=v.Text,d=v.View,o.abrupt("return",{default:function(){var r=typeof window!="undefined"&&window.devicePixelRatio||1,u=720,b=280;return l.createElement(g,{width:u,height:b,dpr:r,clearColor:"#0b1020"},l.createElement(d,{style:{width:u,height:b,padding:16,position:"relative"}},l.createElement(i,{style:{width:u-32,height:b-32},borderRadius:14,fill:"rgba(255,255,255,0.06)"}),l.createElement(i,{style:{position:"absolute",left:34,top:34,width:200,height:56},borderRadius:14,fill:"#f59e0b"}),l.createElement(n,{text:"absolute",style:{position:"absolute",left:52,top:52,fontSize:16,fontWeight:700},color:"#111827"})))}});case 8:case"end":return o.stop()}},e)})))),asset:{type:"BLOCK",id:"docs-guide-layout-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 280

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, position: 'relative' }}>
				<Rect
					style={{ width: width - 32, height: height - 32 }}
					borderRadius={14}
					fill="rgba(255,255,255,0.06)"
				/>
				<Rect
					style={{ position: 'absolute', left: 34, top: 34, width: 200, height: 56 }}
					borderRadius={14}
					fill="#f59e0b"
				/>
				<Text
					text="absolute"
					style={{ position: 'absolute', left: 52, top: 52, fontSize: 16, fontWeight: 700 }}
					color="#111827"
				/>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":P},renderOpts:{compile:function(){var e=w()(h()().mark(function g(){var i,n=arguments;return h()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.e(5420).then(t.bind(t,75420));case 2:return a.abrupt("return",(i=a.sent).default.apply(i,n));case 3:case"end":return a.stop()}},g)}));function v(){return e.apply(this,arguments)}return v}()}}}},11593:function(E,p,t){"use strict";var m;t.r(p),t.d(p,{demos:function(){return g}});var h=t(90819),f=t.n(h),w=t(45332),l=t.n(w),P=t(89933),_=t.n(P),e=t(44194),v=t(9715),g={"docs-guide-scroll-demo-0":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u,b;return f()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=y.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,y.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=y.sent,u=r.useMemo,b=r.useState,y.abrupt("return",{default:function(){var M=typeof window!="undefined"&&window.devicePixelRatio||1,x=720,I=420,T=u(function(){return Array.from({length:30},function(S,R){return R+1})},[]),j=b(0),C=l()(j,2),O=C[0],W=C[1];return e.createElement(d,{width:x,height:I,dpr:M,clearColor:"#0b1020"},e.createElement(s,{style:{width:x,height:I,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:"scrollTop: ".concat(Math.round(O)),style:{fontSize:16,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{scrollY:!0,scrollbarY:!0,scrollbarWidth:10,scrollbarInset:6,scrollbarTrackColor:"rgba(255,255,255,0.10)",scrollbarThumbColor:"rgba(255,255,255,0.35)",onScroll:function(R){return W(R)},style:{width:360,height:320,padding:12,flexDirection:"column",gap:10},background:"rgba(255,255,255,0.06)",borderRadius:14},T.map(function(S){return e.createElement(s,{key:S,style:{width:560,height:44,flexDirection:"row",alignItems:"center",gap:10}},e.createElement(a,{style:{width:44,height:44},borderRadius:12,fill:S%2?"#60a5fa":"#22c55e"}),e.createElement(o,{text:"Item ".concat(S),style:{fontSize:14},color:"rgba(229,231,235,0.90)"}))}))))}});case 13:case"end":return y.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-scroll-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 420

	const items = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), [])
	const [scrollTop, setScrollTop] = useState(0)

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={\`scrollTop: \${Math.round(scrollTop)}\`}
					style={{ fontSize: 16, fontWeight: 700 }}
					color="#e5e7eb"
				/>

				<View
					scrollY
					scrollbarY
					scrollbarWidth={10}
					scrollbarInset={6}
					scrollbarTrackColor="rgba(255,255,255,0.10)"
					scrollbarThumbColor="rgba(255,255,255,0.35)"
					onScroll={(y) => setScrollTop(y)}
					style={{ width: 360, height: 320, padding: 12, flexDirection: 'column', gap: 10 }}
					background="rgba(255,255,255,0.06)"
					borderRadius={14}
				>
					{items.map((n) => (
						<View
							key={n}
							style={{
								width: 560,
								height: 44,
								flexDirection: 'row',
								alignItems: 'center',
								gap: 10,
							}}
						>
							<Rect
								style={{ width: 44, height: 44 }}
								borderRadius={12}
								fill={n % 2 ? '#60a5fa' : '#22c55e'}
							/>
							<Text text={\`Item \${n}\`} style={{ fontSize: 14 }} color="rgba(229,231,235,0.90)" />
						</View>
					))}
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-guide-scroll-demo-1":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s,r,u,b;return f()().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=y.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,y.next=9,Promise.resolve().then(t.t.bind(t,44194,19));case 9:return r=y.sent,u=r.useMemo,b=r.useState,y.abrupt("return",{default:function(){var M=typeof window!="undefined"&&window.devicePixelRatio||1,x=720,I=420,T=u(function(){return Array.from({length:30},function(S,R){return R+1})},[]),j=b(0),C=l()(j,2),O=C[0],W=C[1];return e.createElement(d,{width:x,height:I,dpr:M,clearColor:"#0b1020"},e.createElement(s,{style:{width:x,height:I,padding:16,flexDirection:"column",gap:12}},e.createElement(o,{text:"scrollLeft: ".concat(Math.round(O)),style:{fontSize:16,fontWeight:700},color:"#e5e7eb"}),e.createElement(s,{scrollX:!0,scrollbarX:!0,scrollbarWidth:10,scrollbarInset:6,scrollbarTrackColor:"rgba(255,255,255,0.10)",scrollbarThumbColor:"rgba(255,255,255,0.35)",onScrollX:function(R){return W(R)},style:{width:360,height:320,padding:12,flexDirection:"column",gap:10},background:"rgba(255,255,255,0.06)",borderRadius:14},T.map(function(S){return e.createElement(s,{key:S,style:{width:560,height:44,flexDirection:"row",alignItems:"center",gap:10},background:"green"},e.createElement(a,{style:{width:44,height:44},borderRadius:12,fill:S%2?"#60a5fa":"#22c55e"}),e.createElement(o,{text:"Item ".concat(S),style:{fontSize:14},color:"rgba(229,231,235,0.90)"}))}))))}});case 13:case"end":return y.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-scroll-demo-1",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 420

	const items = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), [])
	const [scrollLeft, setScrollLeft] = useState(0)

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={\`scrollLeft: \${Math.round(scrollLeft)}\`}
					style={{ fontSize: 16, fontWeight: 700 }}
					color="#e5e7eb"
				/>

				<View
					scrollX
					scrollbarX
					scrollbarWidth={10}
					scrollbarInset={6}
					scrollbarTrackColor="rgba(255,255,255,0.10)"
					scrollbarThumbColor="rgba(255,255,255,0.35)"
					onScrollX={(x) => setScrollLeft(x)}
					style={{ width: 360, height: 320, padding: 12, flexDirection: 'column', gap: 10 }}
					background="rgba(255,255,255,0.06)"
					borderRadius={14}
				>
					{items.map((n) => (
						<View
							key={n}
							style={{
								width: 560,
								height: 44,
								flexDirection: 'row',
								alignItems: 'center',
								gap: 10,
							}}
							background={'green'}
						>
							<Rect
								style={{ width: 44, height: 44 }}
								borderRadius={12}
								fill={n % 2 ? '#60a5fa' : '#22c55e'}
							/>
							<Text text={\`Item \${n}\`} style={{ fontSize: 14 }} color="rgba(229,231,235,0.90)" />
						</View>
					))}
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"},react:{type:"NPM",value:"18.3.1"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v,react:m||(m=t.t(e,2))},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}},"docs-guide-scroll-demo-2":{component:e.memo(e.lazy(_()(f()().mark(function i(){var n,d,a,o,s;return f()().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,Promise.resolve().then(t.bind(t,9715));case 2:return n=u.sent,d=n.Canvas,a=n.Rect,o=n.Text,s=n.View,u.abrupt("return",{default:function(){var c=typeof window!="undefined"&&window.devicePixelRatio||1;return e.createElement(d,{width:720,height:320,dpr:c,clearColor:"#0b1020"},e.createElement(s,{style:{width:720,height:320,justifyContent:"center",alignItems:"center"}},e.createElement(s,{scrollY:!0,style:{width:200,height:200},background:"#1e293b",borderRadius:60},e.createElement(a,{style:{width:200,height:400},fill:"#3b82f6"}),e.createElement(o,{text:"Scroll Me",color:"#ffffff",style:{zIndex:1,marginTop:-300,marginLeft:50}}))))}});case 8:case"end":return u.stop()}},i)})))),asset:{type:"BLOCK",id:"docs-guide-scroll-demo-2",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	return (
		<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 320, justifyContent: 'center', alignItems: 'center' }}>
				<View scrollY style={{ width: 200, height: 200 }} background="#1e293b" borderRadius={60}>
					<Rect style={{ width: 200, height: 400 }} fill="#3b82f6" />
					<Text
						text="Scroll Me"
						color="#ffffff"
						style={{ zIndex: 1, marginTop: -300, marginLeft: 50 }}
					/>
				</View>
			</View>
		</Canvas>
	)
}`},"@jiujue/react-canvas-fiber":{type:"NPM",value:"2.1.4"}},entry:"index.tsx"},context:{"@jiujue/react-canvas-fiber":v},renderOpts:{compile:function(){var i=_()(f()().mark(function d(){var a,o=arguments;return f()().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.e(5420).then(t.bind(t,75420));case 2:return r.abrupt("return",(a=r.sent).default.apply(a,o));case 3:case"end":return r.stop()}},d)}));function n(){return i.apply(this,arguments)}return n}()}}}},21945:function(E,p,t){"use strict";t.r(p),t.d(p,{demos:function(){return h}});var m=t(44194),h={}},6928:function(E,p,t){"use strict";t.r(p),t.d(p,{demos:function(){return h}});var m=t(44194),h={}},38949:function(E,p,t){"use strict";t.r(p),t.d(p,{buildTree:function(){return v},flattenTree:function(){return g},ownerPalette:function(){return w},themes:function(){return l},typePalette:function(){return f}});var m=t(86222),h=t.n(m),f=["\u7CFB\u7EDF","\u6A21\u5757","\u76EE\u5F55","\u6570\u636E","\u63A5\u53E3"],w=["\u5E73\u53F0\u7EC4","\u6570\u636E\u7EC4","\u589E\u957F\u7EC4","\u4E1A\u52A1\u7EC4","\u67B6\u6784\u7EC4"],l={dark:{canvasBg:"#0b1226",panelBg:"rgba(15,23,42,0.9)",rowBg:"rgba(148,163,184,0.08)",rowActive:"rgba(59,130,246,0.35)",titleText:"#e2e8f0",metaText:"#94a3b8",labelText:"#cbd5f5",codeText:"#94a3b8",iconText:"#93c5fd",iconMuted:"#64748b",tagBg:"rgba(59,130,246,0.2)",tagText:"#bfdbfe",countBg:"rgba(34,197,94,0.2)",countText:"#86efac",scrollbarTrack:"rgba(148,163,184,0.18)",scrollbarThumb:"rgba(148,163,184,0.5)",inputBg:"#ffffff",inputText:"#0f172a",buttonBg:"#ffffff",buttonText:"#111827"},light:{canvasBg:"#f8fafc",panelBg:"rgba(255,255,255,0.9)",rowBg:"rgba(15,23,42,0.06)",rowActive:"rgba(37,99,235,0.18)",titleText:"#0f172a",metaText:"#475569",labelText:"#334155",codeText:"#64748b",iconText:"#1d4ed8",iconMuted:"#94a3b8",tagBg:"rgba(59,130,246,0.18)",tagText:"#1d4ed8",countBg:"rgba(34,197,94,0.18)",countText:"#15803d",scrollbarTrack:"rgba(100,116,139,0.2)",scrollbarThumb:"rgba(100,116,139,0.55)",inputBg:"#ffffff",inputText:"#0f172a",buttonBg:"#ffffff",buttonText:"#111827"}};function P(i,n,d){return Number.isFinite(i)?Math.max(n,Math.min(d,Math.trunc(i))):n}function _(i){var n=(i|0)^2654435769,d=function(){return n=Math.imul(n,1664525)+1013904223|0,n>>>0};return{nextU32:d,nextInt:function(o){return o<=0?0:d()%o}}}function e(i,n){var d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,a=P(i,1,Number.MAX_SAFE_INTEGER),o=P(n,1,32),s=Math.max(1,Math.min(o,a)),r=_(d),u=new Array(s).fill(1);if(u[0]=1,s>1){for(var b=a-s,c=new Array(s).fill(0).map(function(N,A){return A===0?0:s-A}),y=c.reduce(function(N,A){return N+A},0),D=[],M=0,x=1;x<s;x+=1){var I=b*c[x]/y,T=Math.floor(I);u[x]+=T,M+=T,D.push({level:x,frac:I-T})}var j=b-M;D.sort(function(N,A){return A.frac!==N.frac?A.frac-N.frac:N.level-A.level});for(var C=0;C<j;C+=1)u[D[C%D.length].level]+=1}for(var O=[],W=0;W<s-1;W+=1){for(var S=u[W],R=u[W+1],V=Math.floor(R/S),U=R%S,z=new Array(S).fill(V),L=r.nextInt(S),K=0;K<U;K+=1)z[(L+K)%S]+=1;O.push(z)}return{depth:s,nodesPerLevel:u,childCounts:O}}function v(i,n){var d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,a=e(i,n,d),o=Math.abs(d)%997,s=0,r=function(){var W="node-".concat(s),S=s,R=S+o;return s+=1,{id:W,label:"\u8282\u70B9 ".concat(S+1),code:"T".concat(String(1e3+R)),type:f[R%f.length],owner:w[R*3%w.length],count:6+R*7%42,children:[]}},u=new Array(a.depth);u[0]=[r()];for(var b=0;b<a.depth-1;b+=1){for(var c=u[b],y=a.childCounts[b],D=[],M=0;M<c.length;M+=1)for(var x,I=c[M],T=(x=y[M])!==null&&x!==void 0?x:0,j=0;j<T;j+=1){var C=r();I.children.push(C),D.push(C)}u[b+1]=D}return u[0]}function g(i,n){var d=[],a=function o(s,r){var u=h()(s),b;try{for(u.s();!(b=u.n()).done;){var c=b.value;d.push({node:c,depth:r}),c.children.length&&n.has(c.id)&&o(c.children,r+1)}}catch(y){u.e(y)}finally{u.f()}};return a(i,0),d}},7096:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[]},80523:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Canvas",paraId:0},{value:" \u662F React DOM \u4FA7\u6865\u63A5\u7EC4\u4EF6\uFF1A\u521B\u5EFA ",paraId:0},{value:"<canvas>",paraId:0},{value:"\uFF0C\u521D\u59CB\u5316/\u9500\u6BC1\u8FD0\u884C\u65F6 root\uFF0C\u5E76\u628A\u5B50\u6811\u4EA4\u7ED9\u81EA\u5B9A\u4E49 reconciler \u6E32\u67D3\u3002",paraId:0},{value:`type CanvasProps = {
	width: number
	height: number
	dpr?: number
	clearColor?: string
	fontFamily?: string
	fontSize?: number
	fontWeight?: number | string
	lineHeight?: number
	style?: import('react').CSSProperties
	children?: import('react').ReactNode
}
`,paraId:1,tocIndex:1},{value:"Canvas",paraId:2,tocIndex:2},{value:" \u4E0A\u7684 ",paraId:2,tocIndex:2},{value:"fontFamily/fontSize/fontWeight/lineHeight",paraId:2,tocIndex:2},{value:" \u7528\u4F5C\u9ED8\u8BA4\u503C\uFF0C\u4F9B ",paraId:2,tocIndex:2},{value:"Text",paraId:2,tocIndex:2},{value:" \u8282\u70B9\u7ED8\u5236\u4E0E\u6D4B\u91CF\u4F7F\u7528\u3002",paraId:2,tocIndex:2}]},76989:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Circle",paraId:0},{value:" \u662F\u5706\u5F62/\u692D\u5706\u56FE\u5143\uFF1A\u6839\u636E\u5E03\u5C40\u5F97\u5230\u7684 ",paraId:0},{value:"width/height",paraId:0},{value:" \u7ED8\u5236\uFF08",paraId:0},{value:"rx = width / 2",paraId:0},{value:", ",paraId:0},{value:"ry = height / 2",paraId:0},{value:"\uFF09\uFF0C\u652F\u6301\u586B\u5145\u3001\u63CF\u8FB9\u3001\u7EBF\u5BBD\uFF0C\u5E76\u4E14\u53EF\u4EE5\u6302\u8F7D\u4E8B\u4EF6\u3002",paraId:0},{value:"Name",paraId:1,tocIndex:2},{value:"Type",paraId:1,tocIndex:2},{value:"Default",paraId:1,tocIndex:2},{value:"Description",paraId:1,tocIndex:2},{value:"fill",paraId:1,tocIndex:2},{value:"string",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u586B\u5145\u8272",paraId:1,tocIndex:2},{value:"stroke",paraId:1,tocIndex:2},{value:"string",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u63CF\u8FB9\u8272",paraId:1,tocIndex:2},{value:"lineWidth",paraId:1,tocIndex:2},{value:"number",paraId:1,tocIndex:2},{value:"1",paraId:1,tocIndex:2},{value:"\u63CF\u8FB9\u7EBF\u5BBD",paraId:1,tocIndex:2},{value:"style",paraId:1,tocIndex:2},{value:"YogaStyle",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u5E03\u5C40\u6837\u5F0F\uFF0C\u5EFA\u8BAE\u63D0\u4F9B width/height",paraId:1,tocIndex:2},{value:"...events",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"onClick",paraId:1,tocIndex:2},{value:", ",paraId:1,tocIndex:2},{value:"onPointerDown/Move/Up",paraId:1,tocIndex:2},{value:" \u7B49",paraId:1,tocIndex:2},{value:"children",paraId:1,tocIndex:2},{value:"ReactNode",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u5B50\u8282\u70B9\uFF08\u53C2\u4E0E\u5E03\u5C40\u4E0E\u7ED8\u5236\uFF09",paraId:1,tocIndex:2}]},35179:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Group",paraId:0},{value:" \u662F\u201C\u7EAF\u5BB9\u5668\u201D\u8282\u70B9\uFF1A\u7528\u4E8E\u628A\u4E00\u7EC4\u5B50\u8282\u70B9\u5F53\u4F5C\u6574\u4F53\u505A transform / opacity / zIndex \u7BA1\u7406\uFF0C\u5E76\u8BA9\u8FD9\u4E9B\u6548\u679C\u81EA\u7136\u4F20\u9012\u5230\u5B50\u6811\u3002",paraId:0},{value:"style?: YogaStyle",paraId:1,tocIndex:1},{value:"\uFF1A\u53C2\u4E0E\u5E03\u5C40\uFF1B\u5E76\u652F\u6301 ",paraId:1,tocIndex:1},{value:"transform / transformOrigin / opacity / overflow / zIndex",paraId:1,tocIndex:1},{value:"children?: ReactNode",paraId:1,tocIndex:1},{value:"pointerEvents?: 'auto' | 'none'",paraId:1,tocIndex:1},{value:"\u4E8B\u4EF6\u56DE\u8C03\uFF1A",paraId:1,tocIndex:1},{value:"onPointerDown/Move/Up/Cancel",paraId:1,tocIndex:1},{value:"\u3001",paraId:1,tocIndex:1},{value:"onPointerEnter/Leave",paraId:1,tocIndex:1},{value:"\u3001",paraId:1,tocIndex:1},{value:"onClick",paraId:1,tocIndex:1},{value:"\uFF08\u542B Capture \u7248\u672C\uFF09",paraId:1,tocIndex:1}]},80256:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Image",paraId:0},{value:" \u7528\u4E8E\u6E32\u67D3\u56FE\u7247\uFF1A\u652F\u6301\u7F51\u7EDC\u56FE\u7247\u5730\u5740\u3001\u5706\u89D2\uFF08\u901A\u8FC7 borderRadius \u5C5E\u6027\uFF09\u4EE5\u53CA objectFit \u6A21\u5F0F\u3002",paraId:0},{value:"Image",paraId:1,tocIndex:1},{value:" \u5185\u90E8\u4F1A\u628A ",paraId:1,tocIndex:1},{value:"HTMLImageElement.crossOrigin",paraId:1,tocIndex:1},{value:" \u8BBE\u4E3A ",paraId:1,tocIndex:1},{value:"anonymous",paraId:1,tocIndex:1},{value:"\uFF0C\u56E0\u6B64\u5982\u679C\u4F60\u4F7F\u7528\u8DE8\u57DF\u56FE\u7247\u5730\u5740\uFF0C\u76EE\u6807\u670D\u52A1\u5668\u5FC5\u987B\u8FD4\u56DE\u5141\u8BB8\u8DE8\u57DF\u8BBF\u95EE\u7684\u54CD\u5E94\u5934\uFF08\u4F8B\u5982 ",paraId:1,tocIndex:1},{value:"Access-Control-Allow-Origin: *",paraId:1,tocIndex:1},{value:" \u6216\u5305\u542B\u5F53\u524D\u7AD9\u70B9\u57DF\u540D\uFF09\u3002\u5426\u5219\u56FE\u7247\u4F1A\u52A0\u8F7D\u5931\u8D25\uFF0C\u4ECE\u800C\u8868\u73B0\u4E3A\u201C\u53EA\u663E\u793A\u6587\u5B57\uFF0C\u56FE\u7247\u4E0D\u51FA\u73B0\u201D\u3002",paraId:1,tocIndex:1},{value:"Name",paraId:2,tocIndex:2},{value:"Type",paraId:2,tocIndex:2},{value:"Default",paraId:2,tocIndex:2},{value:"Description",paraId:2,tocIndex:2},{value:"src",paraId:2,tocIndex:2},{value:"string",paraId:2,tocIndex:2},{value:"-",paraId:2,tocIndex:2},{value:"\u56FE\u7247\u5730\u5740",paraId:2,tocIndex:2},{value:"objectFit",paraId:2,tocIndex:2},{value:"'cover' | 'contain' | 'fill'",paraId:2,tocIndex:2},{value:"'contain'",paraId:2,tocIndex:2},{value:"\u56FE\u7247\u586B\u5145\u6A21\u5F0F",paraId:2,tocIndex:2},{value:"borderRadius",paraId:2,tocIndex:2},{value:"number",paraId:2,tocIndex:2},{value:"-",paraId:2,tocIndex:2},{value:"\u5706\u89D2\u534A\u5F84",paraId:2,tocIndex:2},{value:"style",paraId:2,tocIndex:2},{value:"YogaStyle",paraId:2,tocIndex:2},{value:"-",paraId:2,tocIndex:2},{value:"\u5E03\u5C40\u6837\u5F0F\uFF0C\u652F\u6301 width/height \u7B49",paraId:2,tocIndex:2},{value:"...events",paraId:2,tocIndex:2},{value:"-",paraId:2,tocIndex:2},{value:"-",paraId:2,tocIndex:2},{value:"onClick",paraId:2,tocIndex:2},{value:", ",paraId:2,tocIndex:2},{value:"onPointerDown/Move/Up",paraId:2,tocIndex:2},{value:" \u7B49",paraId:2,tocIndex:2}]},37647:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Layer",paraId:0},{value:" \u662F\u201C\u5206\u5C42\u5BB9\u5668\u201D\u8282\u70B9\uFF1AProps \u4E0E ",paraId:0},{value:"View",paraId:0},{value:" \u76F8\u540C\uFF0C\u4F46\u8BED\u4E49\u66F4\u504F\u5411\u201C\u5C42\u201D\u3002\u5E38\u7528\u4E8E\u7EDF\u4E00\u7BA1\u7406\u4E00\u7EC4\u5185\u5BB9\u7684 zIndex \u4E0E\u88C1\u526A\uFF08overflow/\u5706\u89D2/\u6EDA\u52A8\uFF09\u3002",paraId:0},{value:"LayerProps = ViewProps",paraId:1,tocIndex:1},{value:"\uFF0C\u53C2\u8003 ",paraId:1,tocIndex:1},{value:"View",paraId:1,tocIndex:1},{value:"\u3002",paraId:1,tocIndex:1}]},97606:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Line",paraId:0},{value:" \u662F\u7EBF\u6BB5\u56FE\u5143\uFF1A\u5728\u672C\u8282\u70B9\u7684 local \u5750\u6807\u7CFB\u5185\u4ECE ",paraId:0},{value:"(x1,y1)",paraId:0},{value:" \u753B\u5230 ",paraId:0},{value:"(x2,y2)",paraId:0},{value:"\u3002\u5982\u679C\u4E0D\u63D0\u4F9B ",paraId:0},{value:"x2/y2",paraId:0},{value:"\uFF0C\u9ED8\u8BA4\u4ECE ",paraId:0},{value:"(0,0)",paraId:0},{value:" \u6307\u5411\u5E03\u5C40\u7684 ",paraId:0},{value:"(width,height)",paraId:0},{value:"\uFF1B\u652F\u6301 stroke/lineWidth/lineCap\uFF0C\u5E76\u4E14\u53EF\u4EE5\u6302\u8F7D\u4E8B\u4EF6\u3002",paraId:0},{value:"Name",paraId:1,tocIndex:2},{value:"Type",paraId:1,tocIndex:2},{value:"Default",paraId:1,tocIndex:2},{value:"Description",paraId:1,tocIndex:2},{value:"x1",paraId:1,tocIndex:2},{value:"number",paraId:1,tocIndex:2},{value:"0",paraId:1,tocIndex:2},{value:"\u8D77\u70B9 x\uFF08local \u5750\u6807\uFF09",paraId:1,tocIndex:2},{value:"y1",paraId:1,tocIndex:2},{value:"number",paraId:1,tocIndex:2},{value:"0",paraId:1,tocIndex:2},{value:"\u8D77\u70B9 y\uFF08local \u5750\u6807\uFF09",paraId:1,tocIndex:2},{value:"x2",paraId:1,tocIndex:2},{value:"number",paraId:1,tocIndex:2},{value:"width",paraId:1,tocIndex:2},{value:"\u7EC8\u70B9 x\uFF08local \u5750\u6807\uFF09",paraId:1,tocIndex:2},{value:"y2",paraId:1,tocIndex:2},{value:"number",paraId:1,tocIndex:2},{value:"height",paraId:1,tocIndex:2},{value:"\u7EC8\u70B9 y\uFF08local \u5750\u6807\uFF09",paraId:1,tocIndex:2},{value:"stroke",paraId:1,tocIndex:2},{value:"string",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u7EBF\u6761\u989C\u8272",paraId:1,tocIndex:2},{value:"lineWidth",paraId:1,tocIndex:2},{value:"number",paraId:1,tocIndex:2},{value:"1",paraId:1,tocIndex:2},{value:"\u7EBF\u5BBD",paraId:1,tocIndex:2},{value:"lineCap",paraId:1,tocIndex:2},{value:"CanvasLineCap",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u7AEF\u70B9\u6837\u5F0F\uFF08",paraId:1,tocIndex:2},{value:"butt",paraId:1,tocIndex:2},{value:" / ",paraId:1,tocIndex:2},{value:"round",paraId:1,tocIndex:2},{value:" / ",paraId:1,tocIndex:2},{value:"square",paraId:1,tocIndex:2},{value:"\uFF09",paraId:1,tocIndex:2},{value:"style",paraId:1,tocIndex:2},{value:"YogaStyle",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u5E03\u5C40\u6837\u5F0F\uFF0C\u5EFA\u8BAE\u63D0\u4F9B width/height",paraId:1,tocIndex:2},{value:"...events",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"onClick",paraId:1,tocIndex:2},{value:", ",paraId:1,tocIndex:2},{value:"onPointerDown/Move/Up",paraId:1,tocIndex:2},{value:" \u7B49",paraId:1,tocIndex:2},{value:"children",paraId:1,tocIndex:2},{value:"ReactNode",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u5B50\u8282\u70B9\uFF08\u53C2\u4E0E\u5E03\u5C40\u4E0E\u7ED8\u5236\uFF09",paraId:1,tocIndex:2}]},71354:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Path",paraId:0},{value:" \u662F\u57FA\u4E8E SVG path data\uFF08",paraId:0},{value:"d",paraId:0},{value:" \u5B57\u7B26\u4E32\uFF09\u7684\u56FE\u5143\u8282\u70B9\uFF1A\u5185\u90E8\u4F7F\u7528 ",paraId:0},{value:"Path2D(d)",paraId:0},{value:" \u7ED8\u5236\uFF0C\u652F\u6301 fill/stroke/lineWidth/fillRule\uFF0C\u5E76\u4E14\u53EF\u4EE5\u6302\u8F7D\u4E8B\u4EF6\u3002",paraId:0},{value:"Name",paraId:1,tocIndex:3},{value:"Type",paraId:1,tocIndex:3},{value:"Default",paraId:1,tocIndex:3},{value:"Description",paraId:1,tocIndex:3},{value:"d",paraId:1,tocIndex:3},{value:"string",paraId:1,tocIndex:3},{value:"-",paraId:1,tocIndex:3},{value:"SVG path data",paraId:1,tocIndex:3},{value:"fill",paraId:1,tocIndex:3},{value:"string",paraId:1,tocIndex:3},{value:"-",paraId:1,tocIndex:3},{value:"\u586B\u5145\u8272",paraId:1,tocIndex:3},{value:"fillRule",paraId:1,tocIndex:3},{value:"CanvasFillRule",paraId:1,tocIndex:3},{value:"-",paraId:1,tocIndex:3},{value:"\u586B\u5145\u89C4\u5219\uFF08",paraId:1,tocIndex:3},{value:"nonzero",paraId:1,tocIndex:3},{value:" / ",paraId:1,tocIndex:3},{value:"evenodd",paraId:1,tocIndex:3},{value:"\uFF09",paraId:1,tocIndex:3},{value:"stroke",paraId:1,tocIndex:3},{value:"string",paraId:1,tocIndex:3},{value:"-",paraId:1,tocIndex:3},{value:"\u63CF\u8FB9\u8272",paraId:1,tocIndex:3},{value:"lineWidth",paraId:1,tocIndex:3},{value:"number",paraId:1,tocIndex:3},{value:"1",paraId:1,tocIndex:3},{value:"\u63CF\u8FB9\u7EBF\u5BBD",paraId:1,tocIndex:3},{value:"style",paraId:1,tocIndex:3},{value:"YogaStyle",paraId:1,tocIndex:3},{value:"-",paraId:1,tocIndex:3},{value:"\u5E03\u5C40\u6837\u5F0F\uFF0C\u5EFA\u8BAE\u63D0\u4F9B width/height",paraId:1,tocIndex:3},{value:"...events",paraId:1,tocIndex:3},{value:"-",paraId:1,tocIndex:3},{value:"-",paraId:1,tocIndex:3},{value:"onClick",paraId:1,tocIndex:3},{value:", ",paraId:1,tocIndex:3},{value:"onPointerDown/Move/Up",paraId:1,tocIndex:3},{value:" \u7B49",paraId:1,tocIndex:3},{value:"children",paraId:1,tocIndex:3},{value:"ReactNode",paraId:1,tocIndex:3},{value:"-",paraId:1,tocIndex:3},{value:"\u5B50\u8282\u70B9\uFF08\u53C2\u4E0E\u5E03\u5C40\u4E0E\u7ED8\u5236\uFF09",paraId:1,tocIndex:3}]},61542:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Rect",paraId:0},{value:" \u662F\u77E9\u5F62\u56FE\u5143\uFF1A\u652F\u6301\u586B\u5145\u3001\u63CF\u8FB9\u3001\u7EBF\u5BBD\u4E0E\u5706\u89D2\uFF0C\u5E76\u4E14\u53EF\u4EE5\u6302\u8F7D\u4E8B\u4EF6\u3002",paraId:0},{value:"Name",paraId:1,tocIndex:2},{value:"Type",paraId:1,tocIndex:2},{value:"Default",paraId:1,tocIndex:2},{value:"Description",paraId:1,tocIndex:2},{value:"fill",paraId:1,tocIndex:2},{value:"string",paraId:1,tocIndex:2},{value:"#fff",paraId:1,tocIndex:2},{value:"\u586B\u5145\u8272",paraId:1,tocIndex:2},{value:"stroke",paraId:1,tocIndex:2},{value:"string",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u63CF\u8FB9\u8272",paraId:1,tocIndex:2},{value:"lineWidth",paraId:1,tocIndex:2},{value:"number",paraId:1,tocIndex:2},{value:"1",paraId:1,tocIndex:2},{value:"\u63CF\u8FB9\u7EBF\u5BBD",paraId:1,tocIndex:2},{value:"borderRadius",paraId:1,tocIndex:2},{value:"number",paraId:1,tocIndex:2},{value:"0",paraId:1,tocIndex:2},{value:"\u5706\u89D2\u534A\u5F84",paraId:1,tocIndex:2},{value:"style",paraId:1,tocIndex:2},{value:"YogaStyle",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u5E03\u5C40\u6837\u5F0F\uFF0C\u5EFA\u8BAE\u63D0\u4F9B width/height",paraId:1,tocIndex:2},{value:"...events",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"onClick",paraId:1,tocIndex:2},{value:", ",paraId:1,tocIndex:2},{value:"onPointerDown/Move/Up",paraId:1,tocIndex:2},{value:" \u7B49",paraId:1,tocIndex:2},{value:"children",paraId:1,tocIndex:2},{value:"ReactNode",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u5B50\u8282\u70B9\uFF08\u53C2\u4E0E\u5E03\u5C40\u4E0E\u7ED8\u5236\uFF09",paraId:1,tocIndex:2}]},95022:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Text",paraId:0},{value:" \u662F\u6587\u672C\u56FE\u5143\uFF1A\u901A\u8FC7 ",paraId:0},{value:"text",paraId:0},{value:" \u6307\u5B9A\u5185\u5BB9\uFF0C\u652F\u6301\u989C\u8272\u4E0E\u90E8\u5206\u5B57\u4F53\u6837\u5F0F\uFF0C\u5E76\u53C2\u4E0E Yoga \u6D4B\u91CF\u3002",paraId:0},{value:"Name",paraId:1,tocIndex:2},{value:"Type",paraId:1,tocIndex:2},{value:"Default",paraId:1,tocIndex:2},{value:"Description",paraId:1,tocIndex:2},{value:"text",paraId:1,tocIndex:2},{value:"string",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u6587\u672C\u5185\u5BB9\uFF08\u652F\u6301 ",paraId:1,tocIndex:2},{value:"\\\\n",paraId:1,tocIndex:2},{value:"\uFF09",paraId:1,tocIndex:2},{value:"color",paraId:1,tocIndex:2},{value:"string",paraId:1,tocIndex:2},{value:"#fff",paraId:1,tocIndex:2},{value:"\u6587\u672C\u989C\u8272",paraId:1,tocIndex:2},{value:"maxWidth",paraId:1,tocIndex:2},{value:"number",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u6D4B\u91CF\u65F6\u7684\u6700\u5927\u5BBD\u5EA6",paraId:1,tocIndex:2},{value:"style",paraId:1,tocIndex:2},{value:"YogaStyle",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"\u5E03\u5C40\u6837\u5F0F\u4E0E\u5B57\u4F53\u6837\u5F0F\uFF08fontSize \u7B49\uFF09",paraId:1,tocIndex:2},{value:"...events",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"-",paraId:1,tocIndex:2},{value:"onClick",paraId:1,tocIndex:2},{value:", ",paraId:1,tocIndex:2},{value:"onPointerDown/Move/Up",paraId:1,tocIndex:2},{value:" \u7B49",paraId:1,tocIndex:2}]},23024:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"View",paraId:0},{value:" \u662F\u5BB9\u5668\u8282\u70B9\uFF1A\u4E3B\u8981\u7528\u4E8E\u5E03\u5C40\u4E0E\u627F\u8F7D\u80CC\u666F/\u5706\u89D2/\u6EDA\u52A8/\u4E8B\u4EF6\u3002",paraId:0},{value:"View",paraId:1,tocIndex:2},{value:" \u652F\u6301\u7C7B\u4F3C CSS \u7684\u80CC\u666F\u56FE\u7247\u8BBE\u7F6E\u3002",paraId:1,tocIndex:2},{value:"backgroundImage",paraId:2,tocIndex:2},{value:": \u56FE\u7247 URL",paraId:2,tocIndex:2},{value:"backgroundSize",paraId:2,tocIndex:2},{value:": ",paraId:2,tocIndex:2},{value:"cover",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"contain",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"auto",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"100px 50px",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"50% 50%",paraId:2,tocIndex:2},{value:"backgroundPosition",paraId:2,tocIndex:2},{value:": ",paraId:2,tocIndex:2},{value:"center",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"top left",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"10px 20px",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"50% 50%",paraId:2,tocIndex:2},{value:"backgroundRepeat",paraId:2,tocIndex:2},{value:": ",paraId:2,tocIndex:2},{value:"repeat",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"no-repeat",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"repeat-x",paraId:2,tocIndex:2},{value:" | ",paraId:2,tocIndex:2},{value:"repeat-y",paraId:2,tocIndex:2},{value:"style?: YogaStyle",paraId:3,tocIndex:3},{value:": \u5E03\u5C40\u6837\u5F0F",paraId:3,tocIndex:3},{value:"style.transform?: string | number[]",paraId:3,tocIndex:3},{value:"\uFF1A2D transform\uFF08translate/scale/rotate/skew/matrix\uFF09",paraId:3,tocIndex:3},{value:"style.transformOrigin?: string",paraId:3,tocIndex:3},{value:"\uFF1Atransform \u539F\u70B9\uFF08\u9ED8\u8BA4 center\uFF09",paraId:3,tocIndex:3},{value:"style.opacity?: number",paraId:3,tocIndex:3},{value:"\uFF1A\u900F\u660E\u5EA6\uFF080~1\uFF09",paraId:3,tocIndex:3},{value:"style.overflow?: 'visible' | 'hidden'",paraId:3,tocIndex:3},{value:"\uFF1A\u88C1\u526A\u5B50\u5185\u5BB9\uFF08\u914D\u5408\u5706\u89D2\uFF09",paraId:3,tocIndex:3},{value:"style.zIndex?: number",paraId:3,tocIndex:3},{value:"\uFF1A\u7ED8\u5236\u4E0E\u547D\u4E2D\u987A\u5E8F\uFF08\u66F4\u5927\u66F4\u9760\u4E0A\uFF09",paraId:3,tocIndex:3},{value:"background?: string",paraId:3,tocIndex:3},{value:": \u80CC\u666F\u8272",paraId:3,tocIndex:3},{value:"backgroundImage?: string",paraId:3,tocIndex:3},{value:": \u56FE\u7247 URL",paraId:3,tocIndex:3},{value:"backgroundSize?: string",paraId:3,tocIndex:3},{value:": ",paraId:3,tocIndex:3},{value:"cover",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"contain",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"auto",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"100px 50px",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"50% 50%",paraId:3,tocIndex:3},{value:"backgroundPosition?: string",paraId:3,tocIndex:3},{value:": ",paraId:3,tocIndex:3},{value:"center",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"top left",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"10px 20px",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"50% 50%",paraId:3,tocIndex:3},{value:"backgroundRepeat?: string",paraId:3,tocIndex:3},{value:": ",paraId:3,tocIndex:3},{value:"repeat",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"no-repeat",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"repeat-x",paraId:3,tocIndex:3},{value:" | ",paraId:3,tocIndex:3},{value:"repeat-y",paraId:3,tocIndex:3},{value:"border?: string",paraId:3,tocIndex:3},{value:"\uFF0C\u4F8B\u5982 ",paraId:3,tocIndex:3},{value:"1px solid rgba(255,255,255,0.2)",paraId:3,tocIndex:3},{value:"borderRadius?: number",paraId:3,tocIndex:3},{value:"scrollX?: boolean",paraId:3,tocIndex:3},{value:" / ",paraId:3,tocIndex:3},{value:"scrollY?: boolean",paraId:3,tocIndex:3},{value:"\uFF1A\u542F\u7528 X/Y \u65B9\u5411\u6EDA\u52A8\uFF08\u4F1A\u88C1\u526A\u5B50\u5185\u5BB9\uFF09",paraId:3,tocIndex:3},{value:"scrollbarX?: boolean",paraId:3,tocIndex:3},{value:" / ",paraId:3,tocIndex:3},{value:"scrollbarY?: boolean",paraId:3,tocIndex:3},{value:"\uFF1A\u662F\u5426\u663E\u793A\u6EDA\u52A8\u6761\uFF08\u9ED8\u8BA4\u663E\u793A\uFF1B\u8BBE\u4E3A ",paraId:3,tocIndex:3},{value:"false",paraId:3,tocIndex:3},{value:" \u53EF\u9690\u85CF\uFF09",paraId:3,tocIndex:3},{value:"scrollbarWidth?: number",paraId:3,tocIndex:3},{value:"\uFF08\u9ED8\u8BA4 ",paraId:3,tocIndex:3},{value:"10",paraId:3,tocIndex:3},{value:"\uFF09\u3001",paraId:3,tocIndex:3},{value:"scrollbarInset?: number",paraId:3,tocIndex:3},{value:"\uFF08\u9ED8\u8BA4 ",paraId:3,tocIndex:3},{value:"6",paraId:3,tocIndex:3},{value:"\uFF09",paraId:3,tocIndex:3},{value:"scrollbarTrackColor?: string",paraId:3,tocIndex:3},{value:"\uFF08\u9ED8\u8BA4 ",paraId:3,tocIndex:3},{value:"rgba(255,255,255,0.12)",paraId:3,tocIndex:3},{value:"\uFF09\u3001",paraId:3,tocIndex:3},{value:"scrollbarThumbColor?: string",paraId:3,tocIndex:3},{value:"\uFF08\u9ED8\u8BA4 ",paraId:3,tocIndex:3},{value:"rgba(255,255,255,0.35)",paraId:3,tocIndex:3},{value:"\uFF09",paraId:3,tocIndex:3},{value:"onScrollX?: (scrollLeft) => void",paraId:3,tocIndex:3},{value:" / ",paraId:3,tocIndex:3},{value:"onScroll?: (scrollTop) => void",paraId:3,tocIndex:3},{value:"\uFF1A\u6EDA\u52A8\u4F4D\u7F6E\u53D8\u5316\u56DE\u8C03\uFF08\u652F\u6301\u6EDA\u8F6E\u4E0E\u62D6\u62FD\u6EDA\u52A8\u6761\uFF09",paraId:3,tocIndex:3},{value:"pointerEvents?: 'auto' | 'none'",paraId:3,tocIndex:3},{value:"\uFF1A\u662F\u5426\u53C2\u4E0E\u547D\u4E2D",paraId:3,tocIndex:3},{value:"\u4E8B\u4EF6\u56DE\u8C03\uFF1A",paraId:3,tocIndex:3},{value:"onPointerDown/Move/Up/Cancel",paraId:3,tocIndex:3},{value:"\u3001",paraId:3,tocIndex:3},{value:"onPointerEnter/Leave",paraId:3,tocIndex:3},{value:"\u3001",paraId:3,tocIndex:3},{value:"onClick",paraId:3,tocIndex:3},{value:"\uFF08\u542B Capture \u7248\u672C\uFF09",paraId:3,tocIndex:3}]},54416:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Rect",paraId:0},{value:" \u70B9\u51FB\u53EF\u66F4\u6539",paraId:0}]},6544:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Rect",paraId:0},{value:" \u70B9\u51FB\u53EF\u66F4\u6539",paraId:0}]},99278:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"opacity",paraId:0},{value:" \u5C5E\u6027\u63A7\u5236\u8282\u70B9\u7684\u900F\u660E\u5EA6\u3002",paraId:0}]},53652:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"overflow: 'hidden'",paraId:0},{value:" \u914D\u5408 ",paraId:0},{value:"borderRadius",paraId:0},{value:" \u53EF\u4EE5\u5B9E\u73B0\u5706\u89D2\u88C1\u526A\u3002",paraId:0}]},14322:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"transform",paraId:0},{value:" \u5C5E\u6027\u652F\u6301 ",paraId:0},{value:"translate",paraId:0},{value:", ",paraId:0},{value:"scale",paraId:0},{value:", ",paraId:0},{value:"rotate",paraId:0},{value:", ",paraId:0},{value:"skew",paraId:0},{value:" \u7B49\u3002",paraId:0}]},76674:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Rect",paraId:0},{value:" \u70B9\u51FB\u53EF\u66F4\u6539",paraId:0}]},76216:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"Rect",paraId:0},{value:" \u7B2C\u4E00\u4E2A\u7B2C\u4E8C\u4E2A\u662F\u53D7\u63A7\uFF0C\u7B2C\u4E09\u9ED8\u8BA4 flex \u8BA1\u7B97",paraId:0}]},68839:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"zIndex",paraId:0},{value:" \u5C5E\u6027\u63A7\u5236\u8282\u70B9\u7684\u5C42\u53E0\u987A\u5E8F\u3002\u6570\u503C\u8D8A\u5927\u8D8A\u9760\u524D\u3002",paraId:0}]},90811:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"\u672C\u9879\u76EE\u63D0\u4F9B\u4E00\u4E2A Chrome DevTools \u9762\u677F\uFF0C\u7528\u4E8E\u67E5\u770B canvas renderer \u7684\u573A\u666F\u6811\u3001\u9009\u62E9\u8282\u70B9\u5E76\u9AD8\u4EAE\u3001\u67E5\u770B\u8282\u70B9\u5C5E\u6027\u3002",paraId:0},{value:`pnpm install
`,paraId:1,tocIndex:0},{value:`pnpm dev
`,paraId:2,tocIndex:1},{value:`pnpm -C apps/devtools-extension dev
`,paraId:3,tocIndex:2},{value:"\u5728 Chrome \u6253\u5F00 ",paraId:4,tocIndex:2},{value:"chrome://extensions",paraId:4,tocIndex:2},{value:"\uFF0C\u5F00\u542F\u5F00\u53D1\u8005\u6A21\u5F0F\uFF0C\u7136\u540E\u9009\u62E9\u300C\u52A0\u8F7D\u5DF2\u89E3\u538B\u7684\u6269\u5C55\u7A0B\u5E8F\u300D\uFF0C\u76EE\u5F55\u6307\u5411\uFF1A",paraId:4,tocIndex:2},{value:"apps/devtools-extension/build/chrome-mv3-dev",paraId:5,tocIndex:2},{value:"\u6253\u5F00 Demo \u9875\u9762\uFF0C\u6309 ",paraId:6,tocIndex:3},{value:"F12",paraId:6,tocIndex:3},{value:" \u6216\u53F3\u952E\u300C\u68C0\u67E5\u300D\u6253\u5F00 DevTools",paraId:6,tocIndex:3},{value:"\u5207\u6362\u5230 ",paraId:6,tocIndex:3},{value:"Canvas",paraId:6,tocIndex:3},{value:" \u9762\u677F",paraId:6,tocIndex:3},{value:"\u5982\u679C\u9875\u9762\u91CC\u5B58\u5728\u591A\u4E2A ",paraId:6,tocIndex:3},{value:"<Canvas />",paraId:6,tocIndex:3},{value:"\uFF0C\u7528\u4E0B\u62C9\u6846\u9009\u62E9\u8981\u68C0\u67E5\u7684 Root",paraId:6,tocIndex:3},{value:"\u5728\u6811\u4E0A hover \u8282\u70B9\uFF1A\u753B\u5E03\u4E0A\u4F1A\u663E\u793A hover \u9AD8\u4EAE",paraId:6,tocIndex:3},{value:"\u70B9\u51FB\u6811\u8282\u70B9\uFF1A\u753B\u5E03\u4E0A\u4F1A\u663E\u793A selected \u9AD8\u4EAE\uFF0C\u5E76\u5728\u53F3\u4FA7\u5C55\u793A props",paraId:6,tocIndex:3},{value:"\u70B9\u51FB\u300C\u53D6\u70B9\u300D\uFF1A\u8FDB\u5165\u9009\u53D6\u6A21\u5F0F\uFF0C\u5728\u753B\u5E03\u4E0A\u79FB\u52A8\u9F20\u6807/\u70B9\u51FB\u5373\u53EF\u9009\u4E2D\u8282\u70B9\uFF08\u6309 ",paraId:6,tocIndex:3},{value:"Esc",paraId:6,tocIndex:3},{value:" \u53D6\u6D88\uFF09",paraId:6,tocIndex:3},{value:"Canvas",paraId:7,tocIndex:4},{value:` \u9762\u677F\u663E\u793A\u300C\u672A\u53D1\u73B0 Canvas Root\u300D\uFF1A
`,paraId:7,tocIndex:4},{value:"\u786E\u8BA4\u9875\u9762\u5DF2\u6E32\u67D3\u81F3\u5C11\u4E00\u4E2A ",paraId:8,tocIndex:4},{value:"<Canvas />",paraId:8,tocIndex:4},{value:"\u786E\u8BA4\u4F7F\u7528\u7684\u662F\u5F53\u524D\u4ED3\u5E93\u7248\u672C\u7684 ",paraId:8,tocIndex:4},{value:"react-canvas-fiber",paraId:8,tocIndex:4},{value:"\uFF08renderer \u9700\u8981\u5185\u7F6E DevTools \u6CE8\u518C\u8868\uFF09",paraId:8,tocIndex:4}]},14661:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"View",paraId:0},{value:" / ",paraId:0},{value:"Rect",paraId:0},{value:" / ",paraId:0},{value:"Circle",paraId:0},{value:" / ",paraId:0},{value:"Path",paraId:0},{value:" / ",paraId:0},{value:"Line",paraId:0},{value:" / ",paraId:0},{value:"Text",paraId:0},{value:" / ",paraId:0},{value:"Image",paraId:0},{value:" \u652F\u6301 ",paraId:0},{value:"onPointerDown/Move/Up/Cancel",paraId:0},{value:" \u4E0E ",paraId:0},{value:"onClick",paraId:0},{value:"\uFF08\u542B Capture \u7248\u672C\uFF09\uFF0C\u4E5F\u652F\u6301 ",paraId:0},{value:"onPointerEnter/Leave",paraId:0},{value:"\uFF08\u4E0D\u542B Capture \u7248\u672C\uFF09\uFF0C\u5E76\u652F\u6301\u901A\u8FC7 ",paraId:0},{value:"pointerEvents",paraId:0},{value:" \u63A7\u5236\u662F\u5426\u53C2\u4E0E\u547D\u4E2D\u3002",paraId:0},{value:"\u5C06\u67D0\u4E2A\u8282\u70B9\u7684 ",paraId:1,tocIndex:3},{value:'pointerEvents="none"',paraId:1,tocIndex:3},{value:" \u53EF\u4EE5\u8BA9\u5B83\u4E0D\u53C2\u4E0E\u547D\u4E2D\uFF0C\u4E8B\u4EF6\u4F1A\u201C\u7A7F\u900F\u201D\u5230\u4E0B\u5C42\u8282\u70B9\u3002",paraId:1,tocIndex:3},{value:"\u5BF9\u4E8E ",paraId:2,tocIndex:4},{value:"pointerdown/pointermove/pointerup/pointercancel/click",paraId:2,tocIndex:4},{value:"\uFF1A",paraId:2,tocIndex:4},{value:"Capture\uFF1A\u4ECE\u6839\u5230\u76EE\u6807\uFF08\u5148\u7236\u540E\u5B50\uFF09\uFF0C\u89E6\u53D1 ",paraId:3,tocIndex:4},{value:"onXXXCapture",paraId:3,tocIndex:4},{value:"Bubble\uFF1A\u4ECE\u76EE\u6807\u5230\u6839\uFF08\u5148\u5B50\u540E\u7236\uFF09\uFF0C\u89E6\u53D1 ",paraId:3,tocIndex:4},{value:"onXXX",paraId:3,tocIndex:4},{value:"event.stopPropagation()",paraId:3,tocIndex:4},{value:"\uFF1A\u4F1A\u4E2D\u6B62\u540E\u7EED\u7684 Capture \u6216 Bubble \u6D3E\u53D1",paraId:3,tocIndex:4},{value:"event.currentTarget",paraId:3,tocIndex:4},{value:"\uFF1A\u5F53\u524D\u6B63\u5728\u6267\u884C handler \u7684\u8282\u70B9\uFF1B",paraId:3,tocIndex:4},{value:"event.target",paraId:3,tocIndex:4},{value:"\uFF1A\u6700\u521D\u547D\u4E2D\u7684\u8282\u70B9",paraId:3,tocIndex:4},{value:"\u5728\u4E00\u6B21 ",paraId:4,tocIndex:5},{value:"pointerdown",paraId:4,tocIndex:5},{value:" \u547D\u4E2D\u540E\uFF0C\u540C\u4E00\u4E2A ",paraId:4,tocIndex:5},{value:"pointerId",paraId:4,tocIndex:5},{value:" \u7684\u540E\u7EED ",paraId:4,tocIndex:5},{value:"pointermove/pointerup",paraId:4,tocIndex:5},{value:" \u4F1A\u4F18\u5148\u6D3E\u53D1\u5230\u8BE5\u547D\u4E2D\u76EE\u6807\uFF08\u5373\u4F7F\u6307\u9488\u79FB\u51FA\u8BE5\u8282\u70B9\uFF09\uFF0C\u66F4\u63A5\u8FD1 DOM \u7684 pointer capture \u4F53\u9A8C\u3002",paraId:4,tocIndex:5},{value:"onPointerEnter/Leave",paraId:5,tocIndex:6},{value:" \u7528\u4E8E\u6A21\u62DF hover\uFF1A\u5B83\u4EEC\u6309\u201C\u8FDB\u5165\u94FE/\u79BB\u5F00\u94FE\u201D\u9010\u4E2A\u89E6\u53D1\uFF0C\u4E0D\u53C2\u4E0E Capture/Bubble\uFF0C\u4E5F\u4E0D\u63D0\u4F9B ",paraId:5,tocIndex:6},{value:"stopPropagation/preventDefault",paraId:5,tocIndex:6},{value:" \u8BED\u4E49\u3002",paraId:5,tocIndex:6}]},2829:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"\u6838\u5FC3\u5305\u540D\u4E3A ",paraId:0,tocIndex:0},{value:"react-canvas-fiber",paraId:0,tocIndex:0},{value:"\uFF1A",paraId:0,tocIndex:0},{value:"Canvas",paraId:1,tocIndex:1},{value:"\uFF1ADOM \u4FA7\u6865\u63A5\u7EC4\u4EF6\uFF0C\u8D1F\u8D23\u521B\u5EFA ",paraId:1,tocIndex:1},{value:"<canvas>",paraId:1,tocIndex:1},{value:" \u5E76\u7BA1\u7406\u6E32\u67D3 root",paraId:1,tocIndex:1},{value:"View/Rect/Circle/Text/Image",paraId:1,tocIndex:1},{value:"\uFF1A\u81EA\u5B9A\u4E49 renderer \u7684 Host \u8282\u70B9\uFF0C\u4EA4\u7ED9 Yoga \u5E03\u5C40\uFF0C\u6700\u540E\u7528 Canvas2D \u7ED8\u5236",paraId:1,tocIndex:1}]},83471:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"View",paraId:0},{value:" / ",paraId:0},{value:"Rect",paraId:0},{value:" / ",paraId:0},{value:"Text",paraId:0},{value:" \u90FD\u53EF\u4EE5\u4F20 ",paraId:0},{value:"style",paraId:0},{value:"\uFF0C\u5E03\u5C40\u5B50\u96C6\u7531 Yoga \u8BA1\u7B97\u5F97\u51FA\u3002",paraId:0},{value:"\u4EE5\u4E0B\u5B57\u6BB5\u4E0D\u53C2\u4E0E Yoga \u8BA1\u7B97\uFF0C\u4F46\u4F1A\u5F71\u54CD\u7ED8\u5236\u4E0E\u547D\u4E2D\uFF1A",paraId:1,tocIndex:2},{value:"style.transform?: string | number[]",paraId:2,tocIndex:2},{value:"\uFF1A2D \u53D8\u6362\uFF08translate/scale/rotate/skew/matrix\uFF09",paraId:2,tocIndex:2},{value:"style.transformOrigin?: string",paraId:2,tocIndex:2},{value:"\uFF1A\u53D8\u6362\u539F\u70B9\uFF08\u9ED8\u8BA4 center\uFF09",paraId:2,tocIndex:2},{value:"style.opacity?: number",paraId:2,tocIndex:2},{value:"\uFF1A\u900F\u660E\u5EA6\uFF080~1\uFF09",paraId:2,tocIndex:2},{value:"style.overflow?: 'visible' | 'hidden'",paraId:2,tocIndex:2},{value:"\uFF1A\u88C1\u526A\u5B50\u5185\u5BB9\uFF08\u5E38\u7528\u4E8E\u914D\u5408\u5706\u89D2\uFF09",paraId:2,tocIndex:2},{value:"style.zIndex?: number",paraId:2,tocIndex:2},{value:"\uFF1A\u5F71\u54CD\u7ED8\u5236\u4E0E\u547D\u4E2D\u987A\u5E8F\uFF08\u66F4\u5927\u66F4\u9760\u4E0A\uFF09",paraId:2,tocIndex:2}]},4435:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"View",paraId:0},{value:" \u63D0\u4F9B ",paraId:0},{value:"scrollX/scrollY",paraId:0},{value:" \u4E0E\u6EDA\u52A8\u6761\u76F8\u5173\u5C5E\u6027\uFF0C\u7528\u4E8E\u5B9E\u73B0\u753B\u5E03\u5185\u6EDA\u52A8\u5BB9\u5668\u3002",paraId:0},{value:"\u5F53 ",paraId:1,tocIndex:0},{value:"scrollX/scrollY",paraId:1,tocIndex:0},{value:" \u542F\u7528\u4E14\u5185\u5BB9\u8D85\u51FA\u5BB9\u5668\u5C3A\u5BF8\u65F6\uFF0C\u4F1A\u81EA\u52A8\u7ED8\u5236\u6EDA\u52A8\u6761\uFF1B\u4F60\u4E5F\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u5C5E\u6027\u81EA\u5B9A\u4E49\u5916\u89C2\uFF1A",paraId:1,tocIndex:0},{value:"scrollbarX/scrollbarY",paraId:2,tocIndex:0},{value:": \u662F\u5426\u663E\u793A\u6EDA\u52A8\u6761\uFF08\u9ED8\u8BA4\uFF1A\u6EDA\u52A8\u542F\u7528\u65F6\u663E\u793A\uFF1B\u8BBE\u4E3A ",paraId:2,tocIndex:0},{value:"false",paraId:2,tocIndex:0},{value:" \u53EF\u9690\u85CF\uFF09",paraId:2,tocIndex:0},{value:"scrollbarWidth",paraId:2,tocIndex:0},{value:": \u6EDA\u52A8\u6761\u5BBD\u5EA6\uFF08\u9ED8\u8BA4 ",paraId:2,tocIndex:0},{value:"10",paraId:2,tocIndex:0},{value:"\uFF09",paraId:2,tocIndex:0},{value:"scrollbarInset",paraId:2,tocIndex:0},{value:": \u6EDA\u52A8\u6761\u8DDD\u8FB9\u7F18\u7684\u5185\u7F29\uFF08\u9ED8\u8BA4 ",paraId:2,tocIndex:0},{value:"6",paraId:2,tocIndex:0},{value:"\uFF09",paraId:2,tocIndex:0},{value:"scrollbarTrackColor",paraId:2,tocIndex:0},{value:": \u8F68\u9053\u989C\u8272\uFF08\u9ED8\u8BA4 ",paraId:2,tocIndex:0},{value:"rgba(255,255,255,0.12)",paraId:2,tocIndex:0},{value:"\uFF09",paraId:2,tocIndex:0},{value:"scrollbarThumbColor",paraId:2,tocIndex:0},{value:": \u6ED1\u5757\u989C\u8272\uFF08\u9ED8\u8BA4 ",paraId:2,tocIndex:0},{value:"rgba(255,255,255,0.35)",paraId:2,tocIndex:0},{value:"\uFF09",paraId:2,tocIndex:0},{value:"\u9F20\u6807\u6EDA\u8F6E\u4F1A\u5728\u547D\u4E2D\u8DEF\u5F84\u4E0A\u7531\u5185\u5411\u5916\u5C1D\u8BD5\u6D88\u8D39 ",paraId:3,tocIndex:1},{value:"deltaX/deltaY",paraId:3,tocIndex:1},{value:"\uFF0C\u4F18\u5148\u8BA9\u6700\u8FD1\u7684\u53EF\u6EDA\u52A8 ",paraId:3,tocIndex:1},{value:"View",paraId:3,tocIndex:1},{value:" \u6EDA\u52A8",paraId:3,tocIndex:1},{value:"\u652F\u6301\u62D6\u62FD\u6EDA\u52A8\u6761\u6ED1\u5757\u8FDB\u884C\u6EDA\u52A8",paraId:3,tocIndex:1},{value:"View",paraId:4,tocIndex:2},{value:" \u5728\u6EDA\u52A8\u65F6\u4E5F\u4F1A\u9075\u5FAA ",paraId:4,tocIndex:2},{value:"borderRadius",paraId:4,tocIndex:2},{value:" \u8FDB\u884C\u5706\u89D2\u88C1\u526A\u3002",paraId:4,tocIndex:2}]},52311:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"\u672C\u9875\u7528\u4E8E\u56DE\u7B54\u4E09\u4E2A\u95EE\u9898\uFF1A",paraId:0},{value:"\u73B0\u5728\u662F\u5426\u5DF2\u6709\u7C7B\u4F3C\u9879\u76EE\uFF1F",paraId:1},{value:"\u8FD9\u4E2A\u9879\u76EE\u548C\u5B83\u4EEC\u7684\u6838\u5FC3\u5DEE\u5F02\u3001\u4F18\u52A3\u662F\u4EC0\u4E48\uFF1F",paraId:1},{value:"\u662F\u5426\u5C5E\u4E8E\u91CD\u590D\u9020\u8F6E\u5B50\uFF1F\u91CD\u590D\u7684\u90E8\u5206\u5728\u54EA\u91CC\uFF0C\u4EF7\u503C\u5728\u54EA\u91CC\uFF1F",paraId:1},{value:"react-canvas-fiber",paraId:2,tocIndex:0},{value:" \u662F\u4E00\u4E2A\u628A React \u7684\u58F0\u660E\u5F0F UI + \u8C03\u5EA6\u80FD\u529B\uFF0C\u6620\u5C04\u5230 Canvas2D \u7684\u81EA\u5B9A\u4E49\u6E32\u67D3\u5668\uFF1A\u5B83\u7EF4\u62A4\u81EA\u5DF1\u7684 scene graph\uFF0C\u5E76\u5728\u6BCF\u6B21 commit \u540E\u6267\u884C ",paraId:2,tocIndex:0},{value:"layout -> draw",paraId:2,tocIndex:0},{value:"\u3002\u5176\u4E2D layout \u91C7\u7528 Yoga \u98CE\u683C\u7684 flexbox \u8BED\u4E49\uFF0C\u76EE\u6807\u66F4\u504F\u5411\u201C\u5E94\u7528 UI\u201D\uFF0C\u800C\u4E0D\u662F\u201C\u7ED8\u56FE/\u6E38\u620F\u5F15\u64CE\u5C01\u88C5\u201D\u3002",paraId:2,tocIndex:0},{value:"\u65B9\u5411\uFF1AReact \u81EA\u5B9A\u4E49 renderer\uFF0C\u7528 JSX \u63CF\u8FF0 three.js \u7684 3D scene graph\u3002",paraId:3,tocIndex:2},{value:"\u9002\u7528\uFF1A3D/WebGL \u573A\u666F\uFF0C\u6A21\u578B/\u6750\u8D28/\u706F\u5149/\u76F8\u673A/\u540E\u671F\u7B49\u3002",paraId:3,tocIndex:2},{value:"\u7ED3\u8BBA\uFF1A\u7406\u5FF5\u540C\u6E90\uFF08React reconciler + scene graph\uFF09\uFF0C\u4F46\u6E32\u67D3\u540E\u7AEF\u4E0E\u4EA4\u4E92/\u6027\u80FD\u6A21\u578B\u5B8C\u5168\u4E0D\u540C\uFF08WebGL vs Canvas2D\uFF09\u3002",paraId:3,tocIndex:2},{value:"\u53C2\u8003\uFF1A",paraId:4,tocIndex:2},{value:"https://github.com/pmndrs/react-three-fiber",paraId:5,tocIndex:2},{value:"\u65B9\u5411\uFF1AReact \u7ED1\u5B9A Konva\uFF08Canvas2D \u7684\u5BF9\u8C61\u6A21\u578B\u4E0E\u4E8B\u4EF6\u7CFB\u7EDF\uFF09\u3002",paraId:6,tocIndex:3},{value:"\u9002\u7528\uFF1A\u56FE\u5F62\u7F16\u8F91\u5668\u3001\u62D6\u62FD\u3001\u5F62\u72B6\u7ED8\u5236\u3001\u53EF\u89C6\u5316\u7B49\uFF08Konva \u751F\u6001\u5F3A\uFF09\u3002",paraId:6,tocIndex:3},{value:"\u7ED3\u8BBA\uFF1A\u5B83\u7684\u201C\u573A\u666F\u4E0E\u4E8B\u4EF6\u201D\u6765\u81EA Konva\uFF0C\u5E03\u5C40\u4E0D\u4EE5 Yoga \u98CE\u683C\u4E3A\u6838\u5FC3\uFF0C\u66F4\u591A\u662F\u56FE\u5F62\u5E93\u5BF9\u8C61\u5C5E\u6027\u9A71\u52A8\u3002",paraId:6,tocIndex:3},{value:"\u53C2\u8003\uFF1A",paraId:7,tocIndex:3},{value:"https://github.com/konvajs/react-konva",paraId:8,tocIndex:3},{value:"https://konvajs.org/docs/react/index.html",paraId:8,tocIndex:3},{value:"\u65B9\u5411\uFF1A\u628A React \u7EC4\u4EF6\u6E32\u67D3\u5230 Canvas\uFF0C\u5F3A\u8C03\u201CUI \u6027\u80FD\u201D\u3002",paraId:9,tocIndex:4},{value:"\u73B0\u72B6\uFF1A\u5386\u53F2\u9879\u76EE\uFF0C\u7EF4\u62A4\u6D3B\u8DC3\u5EA6\u8F83\u4F4E\uFF08\u5927\u91CF issue \u957F\u671F\u672A\u5904\u7406\uFF09\u3002",paraId:9,tocIndex:4},{value:"\u7ED3\u8BBA\uFF1A\u65B9\u5411\u6700\u63A5\u8FD1\uFF08Canvas \u505A UI\uFF09\uFF0C\u4F46\u5E74\u4EE3\u4E45\u8FDC\u3001\u751F\u6001\u4E0E\u73B0\u4EE3 React/\u5DE5\u5177\u94FE\u96C6\u6210\u6210\u672C\u9AD8\u3002",paraId:9,tocIndex:4},{value:"\u53C2\u8003\uFF1A",paraId:10,tocIndex:4},{value:"https://github.com/Flipboard/react-canvas",paraId:11,tocIndex:4},{value:"\u65B9\u5411\uFF1AReact renderer \u7ED1\u5B9A PixiJS\uFF08\u504F 2D \u6E38\u620F/\u6E32\u67D3\u5F15\u64CE\uFF09\u3002",paraId:12,tocIndex:5},{value:"\u9002\u7528\uFF1A\u7CBE\u7075\u3001\u7C92\u5B50\u3001\u6EE4\u955C\u3001\u590D\u6742 2D \u52A8\u6548\u3001GPU \u52A0\u901F UI/\u6E38\u620F\u3002",paraId:12,tocIndex:5},{value:"\u7ED3\u8BBA\uFF1A\u540C\u6837\u662F\u201CReact + scene graph\u201D\uFF0C\u4F46 Pixi \u662F\u5F15\u64CE\u7EA7\u62BD\u8C61\uFF0C\u5E03\u5C40\u8BED\u4E49\u901A\u5E38\u4E0D\u8D70 Yoga \u98CE\u683C\uFF0C\u66F4\u591A\u662F\u4EE5\u5F15\u64CE\u5BF9\u8C61\u6811\u4E3A\u4E2D\u5FC3\u3002",paraId:12,tocIndex:5},{value:"\u53C2\u8003\uFF1A",paraId:13,tocIndex:5},{value:"https://react.pixijs.io/",paraId:14,tocIndex:5},{value:"https://github.com/michalochman/react-pixi-fiber",paraId:14,tocIndex:5},{value:"Yoga \u98CE\u683C\u5E03\u5C40\uFF1A\u5BF9\u4E8E\u201C\u5E94\u7528 UI\u201D\u8FD9\u79CD\u4EE5 flexbox \u4E3A\u4E3B\u7684\u6392\u7248\u66F4\u987A\u624B\u3002",paraId:15,tocIndex:7},{value:"\u8F7B\u91CF\uFF1A\u4E0D\u4F9D\u8D56\u5927\u578B\u56FE\u5F62\u5F15\u64CE\uFF08Konva/Pixi/Three\uFF09\uFF0C\u6210\u672C\u66F4\u53EF\u63A7\u3002",paraId:15,tocIndex:7},{value:"React \u8BED\u4E49\u4E00\u81F4\uFF1A\u72B6\u6001\u9A71\u52A8\u3001diff\u3001\u5408\u5E27\uFF08rAF\uFF09\u7B49\u6A21\u578B\u4E0E React \u66F4\u8D34\u5408\u3002",paraId:15,tocIndex:7},{value:"\u5185\u7F6E DevTools \u9762\u677F\uFF1A\u76F4\u63A5\u56F4\u7ED5\u201Cscene tree + \u8282\u70B9\u9AD8\u4EAE + props\u201D\u505A\u5F00\u53D1\u4F53\u9A8C\u95ED\u73AF\u3002",paraId:15,tocIndex:7},{value:"\u751F\u6001\u7F3A\u53E3\uFF1A\u5BF9\u6BD4 Konva/Pixi/Three\uFF0C\u5185\u7F6E\u56FE\u5143\u3001\u6EE4\u955C\u3001\u6587\u672C\u6392\u7248\u3001\u547D\u4E2D\u6D4B\u8BD5\u3001\u52A8\u753B\u7CFB\u7EDF\u7B49\u90FD\u9700\u8981\u81EA\u5DF1\u8865\u9F50\u6216\u5F15\u5165\u5916\u90E8\u5B9E\u73B0\u3002",paraId:16,tocIndex:8},{value:"\u53EF\u8BBF\u95EE\u6027\u4E0E\u8F93\u5165\u6CD5\u7B49\u95EE\u9898\uFF1ACanvas UI \u5929\u751F\u4F1A\u7ED5\u5F00 DOM \u7684\u5927\u91CF\u7CFB\u7EDF\u80FD\u529B\uFF08\u6587\u672C\u9009\u62E9/\u590D\u5236/IME/\u65E0\u969C\u788D\u7B49\uFF09\uFF0C\u9700\u8981\u989D\u5916\u65B9\u6848\u8865\u9F50\u3002",paraId:16,tocIndex:8},{value:"\u5BF9\u9F50\u6D4F\u89C8\u5668\u80FD\u529B\u7684\u8FB9\u89D2\uFF1A\u6BD4\u5982\u6587\u5B57\u6D4B\u91CF\u3001\u5B57\u4F53\u6E32\u67D3\u5DEE\u5F02\u3001\u79BB\u5C4F\u7F13\u5B58\u7B56\u7565\u7B49\uFF0C\u5DE5\u7A0B\u7EC6\u8282\u5F88\u591A\u3002",paraId:16,tocIndex:8},{value:"\u7ED3\u8BBA\u5206\u4E24\u5C42\uFF1A",paraId:17,tocIndex:9},{value:"\u91CD\u590D\u7684\u90E8\u5206\uFF1AReact reconciler + scene graph + canvas draw \u8FD9\u6761\u8DEF\u7EBF\u4E0D\u662F\u65B0\u8DEF\u7EBF\uFF08R3F\u3001react-konva\u3001react-canvas\u3001Pixi React \u90FD\u5728\u505A\u201CReact \u5230\u975E DOM \u6E32\u67D3\u76EE\u6807\u201D\u7684\u6620\u5C04\uFF09\u3002",paraId:18,tocIndex:9},{value:"\u4E0D\u91CD\u590D\u7684\u90E8\u5206\uFF08\u4EF7\u503C\u70B9\uFF09\uFF1A\u672C\u9879\u76EE\u628A\u201C\u5E94\u7528 UI \u7684 Yoga \u98CE\u683C\u5E03\u5C40 + Canvas2D \u6E32\u67D3 + \u4E13\u7528 DevTools\u201D\u4F5C\u4E3A\u4E00\u4E2A\u5B8C\u6574\u95ED\u73AF\u6765\u505A\uFF0C\u76EE\u6807\u662F\u66F4\u5C0F\u66F4\u805A\u7126\u7684 UI \u65B9\u6848\uFF0C\u800C\u4E0D\u662F\u7ED1\u5B9A\u4E00\u4E2A\u6210\u719F\u5F15\u64CE\u6216\u5E93\u3002",paraId:18,tocIndex:9},{value:"\u5982\u679C\u4F60\u7684\u76EE\u6807\u662F\u201C\u56FE\u5F62\u7F16\u8F91\u5668/\u590D\u6742\u5F62\u72B6\u4E0E\u4E8B\u4EF6/\u6210\u719F\u751F\u6001\u201D\uFF0Creact-konva \u5F80\u5F80\u6027\u4EF7\u6BD4\u66F4\u9AD8\uFF1B\u5982\u679C\u4F60\u7684\u76EE\u6807\u662F\u201C2D \u5F15\u64CE/\u5927\u91CF\u52A8\u6548\u4E0E GPU \u52A0\u901F\u201D\uFF0CPixi React \u66F4\u5408\u9002\uFF1B\u5982\u679C\u4F60\u7684\u76EE\u6807\u662F\u201C3D\u201D\uFF0CR3F \u57FA\u672C\u662F\u4E8B\u5B9E\u6807\u51C6\uFF1B\u5982\u679C\u4F60\u7684\u76EE\u6807\u662F\u201C\u7528 flexbox \u601D\u7EF4\u5199 UI\uFF0C\u5E76\u628A\u6700\u7EC8\u8F93\u51FA\u653E\u5230 canvas\uFF08\u5E76\u63A5\u53D7 canvas \u7684\u5E73\u53F0\u4EE3\u4EF7\uFF09\u201D\uFF0C\u672C\u9879\u76EE\u624D\u66F4\u5339\u914D\u3002",paraId:19,tocIndex:9}]},35429:function(E,p,t){"use strict";t.r(p),t.d(p,{texts:function(){return m}});const m=[{value:"\u672C\u9875\u6C47\u603B ",paraId:0},{value:"react-canvas-fiber",paraId:0},{value:" \u7684 TypeScript \u7C7B\u578B\u5B9A\u4E49\uFF08\u4EE5\u6E90\u7801\u4E3A\u51C6\uFF09\u3002",paraId:0},{value:`export type { CanvasProps } from './canvas'
export type { LayoutEngine } from './layout'
export type {
	CanvasNode,
	CircleNode,
	ImageNode,
	Layout,
	LineNode,
	NodeType,
	PathNode,
	RectNode,
	RootNode,
	TextNode,
	ViewNode,
} from './nodes'
export type {
	CanvasPointerEvent,
	CanvasPointerEventHandler,
	CanvasPointerEventType,
	CircleProps,
	ImageProps,
	LineProps,
	PathProps,
	PointerEventsMode,
	RectProps,
	TextProps,
	ViewProps,
	YogaStyle,
} from './jsx'
export type { CanvasContainer, CanvasRootOptions, MeasureTextFn } from './runtime'
export type { DrawState } from './render'
`,paraId:1,tocIndex:0},{value:`export type CanvasProps = {
	width: number
	height: number
	dpr?: number
	clearColor?: string
	fontFamily?: string
	fontSize?: number
	fontWeight?: number | string
	lineHeight?: number
	style?: import('react').CSSProperties
	children?: import('react').ReactNode
}
`,paraId:2,tocIndex:1},{value:`export type CanvasPointerEventType =
	| 'pointerdown'
	| 'pointermove'
	| 'pointerup'
	| 'pointercancel'
	| 'click'
	| 'pointerenter'
	| 'pointerleave'

export type CanvasPointerEvent = {
	type: CanvasPointerEventType
	x: number
	y: number
	pointerId: number
	button: number
	buttons: number
	altKey: boolean
	ctrlKey: boolean
	shiftKey: boolean
	metaKey: boolean
	target: any
	currentTarget: any
	defaultPrevented: boolean
	stopPropagation: () => void
	preventDefault: () => void
}

export type CanvasPointerEventHandler = (event: CanvasPointerEvent) => void

export type PointerEventsMode = 'auto' | 'none'

export type YogaStyle = {
	width?: number
	height?: number
	minWidth?: number
	minHeight?: number
	maxWidth?: number
	maxHeight?: number

	flexDirection?: 'row' | 'column'
	justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
	alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end'
	alignContent?: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
	flexWrap?: 'no-wrap' | 'wrap'

	flexGrow?: number
	flexShrink?: number
	flexBasis?: number

	padding?: number
	paddingHorizontal?: number
	paddingVertical?: number
	paddingTop?: number
	paddingRight?: number
	paddingBottom?: number
	paddingLeft?: number

	margin?: number
	marginHorizontal?: number
	marginVertical?: number
	marginTop?: number
	marginRight?: number
	marginBottom?: number
	marginLeft?: number

	position?: 'relative' | 'absolute'
	top?: number
	right?: number
	bottom?: number
	left?: number

	gap?: number

	transform?: string | number[]
	transformOrigin?: string
	overflow?: 'visible' | 'hidden'
	zIndex?: number
	opacity?: number

	fontSize?: number
	fontFamily?: string
	fontWeight?: number | string
	lineHeight?: number
}

export type ViewProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	background?: string
	backgroundImage?: string
	backgroundPosition?: string
	backgroundSize?: string
	backgroundRepeat?: string
	border?: string
	borderRadius?: number
	scrollX?: boolean
	scrollY?: boolean
	scrollbarX?: boolean
	scrollbarY?: boolean
	scrollbarWidth?: number
	scrollbarInset?: number
	scrollbarTrackColor?: string
	scrollbarThumbColor?: string
	onScrollX?: (scrollLeft: number) => void
	onScroll?: (scrollTop: number) => void
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type RectProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	fill?: string
	stroke?: string
	lineWidth?: number
	borderRadius?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type CircleProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	fill?: string
	stroke?: string
	lineWidth?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type PathProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	d: string
	fill?: string
	fillRule?: CanvasFillRule
	stroke?: string
	lineWidth?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type LineProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	x1?: number
	y1?: number
	x2?: number
	y2?: number
	stroke?: string
	lineWidth?: number
	lineCap?: CanvasLineCap
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type TextProps = {
	children?: never
	text: string
	style?: YogaStyle
	color?: string
	maxWidth?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type ImageProps = {
	children?: never
	style?: YogaStyle
	src: string
	objectFit?: 'cover' | 'contain' | 'fill'
	borderRadius?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}
`,paraId:3,tocIndex:2},{value:`export type LayoutEngine = {
	yoga: Awaited<ReturnType<import('yoga-layout/load').loadYoga>>
}
`,paraId:4,tocIndex:3},{value:`export type NodeType = 'Root' | 'View' | 'Rect' | 'Circle' | 'Path' | 'Line' | 'Text' | 'Image'

export type Layout = {
	x: number
	y: number
	width: number
	height: number
}

export type BaseNode<T extends NodeType, P> = {
	type: T
	parent: CanvasNode | RootNode | null
	children: CanvasNode[]
	props: P
	layout: Layout
	contentBounds?: Layout
	yogaNode: any | null
	debugId: number
	scrollLeft?: number
	scrollTop?: number
	scrollContentWidth?: number
	scrollContentHeight?: number
	scrollbarDrag?: {
		axis: 'x' | 'y'
		pointerId: number
		startPointer: number
		startScroll: number
	} | null
}

export type RootNode = BaseNode<'Root', Record<string, never>>
export type ViewNode = BaseNode<'View', ViewProps> & {
	backgroundImageInstance: HTMLImageElement | null
}
export type RectNode = BaseNode<'Rect', RectProps>
export type CircleNode = BaseNode<'Circle', CircleProps>
export type PathNode = BaseNode<'Path', PathProps> & {
	path2d: Path2D | null
	pathSource: string | null
}
export type LineNode = BaseNode<'Line', LineProps>
export type TextNode = BaseNode<'Text', TextProps>
export type ImageNode = BaseNode<'Image', ImageProps> & {
	imageInstance: HTMLImageElement | null
}

export type CanvasNode =
	| ViewNode
	| RectNode
	| CircleNode
	| PathNode
	| LineNode
	| TextNode
	| ImageNode
`,paraId:5,tocIndex:4},{value:`export type CanvasContainer = {
	root: RootNode
	invalidate: () => void
	notifyCommit?: () => void
}

export type CanvasRootOptions = {
	width: number
	height: number
	dpr: number
	clearColor?: string
	fontFamily?: string
	fontSize?: number
	fontWeight?: number | string
	lineHeight?: number
}

export type MeasureTextFn = (
	text: string,
	font: string,
	maxWidth?: number,
) => { width: number; height: number }
`,paraId:6,tocIndex:5},{value:`export type DrawState = {
	ctx: CanvasRenderingContext2D
	dpr: number
	defaults?: CanvasRootOptions
}
`,paraId:7,tocIndex:6},{value:`declare global {
	namespace JSX {
		interface IntrinsicElements {
			View: ViewProps
			Rect: RectProps
			Circle: CircleProps
			Path: PathProps
			Line: LineProps
			Text: TextProps
			Image: ImageProps
		}
	}
}
`,paraId:8,tocIndex:7}]},12799:function(E,p){"use strict";p.Z=`import { Canvas, Text, View } from '@jiujue/react-canvas-fiber'
import { useEffect, useMemo, useState } from 'react'
import { buildTree, flattenTree, themes } from './utils'

function clampInt(value: number, min: number, max: number) {
	if (!Number.isFinite(value)) return min
	return Math.max(min, Math.min(max, Math.trunc(value)))
}

export default function TreeSelectDemo() {
	// \u4E0B\u62C9\u663E\u9690\u3001\u6570\u636E\u89C4\u6A21\u4E0E\u6811\u72B6\u6001
	const [open, setOpen] = useState(true)
	const [draftTotalCount, setDraftTotalCount] = useState(120)
	const [draftMaxDepth, setDraftMaxDepth] = useState(4)
	const [totalCount, setTotalCount] = useState(120)
	const [maxDepth, setMaxDepth] = useState(4)
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
	const [themeName, setThemeName] = useState<'dark' | 'light'>('dark')
	const [dataVersion, setDataVersion] = useState(0)

	// \u6839\u636E\u603B\u91CF/\u6DF1\u5EA6\u751F\u6210\u6811
	const data = useMemo(
		() => buildTree(totalCount, maxDepth, dataVersion),
		[dataVersion, totalCount, maxDepth],
	)

	// \u6570\u636E\u53D8\u5316\u65F6\uFF1A\u9ED8\u8BA4\u5C55\u5F00\u4E00\u7EA7\uFF0C\u5E76\u786E\u4FDD\u9009\u4E2D\u9879\u4ECD\u7136\u5B58\u5728
	useEffect(() => {
		const next = new Set<string>()
		for (const root of data) next.add(root.id)
		setExpandedIds(next)
		setSelectedId((prev) => {
			if (!prev) return prev
			const exists = flattenTree(data, next).some((item) => item.node.id === prev)
			return exists ? prev : null
		})
	}, [data])

	// \u751F\u6210\u6241\u5E73\u5217\u8868\u4E0E\u5F53\u524D\u9009\u4E2D\u8282\u70B9
	const flatNodes = useMemo(() => flattenTree(data, expandedIds), [data, expandedIds])
	const selectedNode = useMemo(
		() => flatNodes.find((item) => item.node.id === selectedId)?.node ?? null,
		[flatNodes, selectedId],
	)

	// \u5C55\u5F00/\u6536\u8D77\u67D0\u4E2A\u8282\u70B9
	const toggleExpanded = (id: string) => {
		setExpandedIds((prev) => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}

	// \u9009\u4E2D\u8282\u70B9\u5E76\u6536\u8D77\u4E0B\u62C9
	const selectNode = (id: string) => {
		setSelectedId(id)
		setOpen(false)
	}

	// \u6E32\u67D3\u6240\u9700\u7684\u4E3B\u9898\u4E0E\u753B\u5E03\u53C2\u6570
	const theme = themes[themeName]
	const width = 560
	const height = 340
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const renderKey = \`\${totalCount}-\${maxDepth}-\${dataVersion}\`
	const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now())

	const canvasRowsBuildStart = open ? now() : 0
	const canvasRows = open
		? flatNodes.map(({ node, depth }) => {
				const expanded = expandedIds.has(node.id)
				const hasChildren = node.children.length > 0
				const selected = node.id === selectedId
				return (
					<View
						key={node.id}
						onClick={() => selectNode(node.id)}
						style={{
							height: 48,
							paddingHorizontal: 10,
							flexDirection: 'row',
							alignItems: 'center',
							gap: 8,
						}}
						background={selected ? theme.rowActive : theme.rowBg}
						borderRadius={9}
					>
						<View style={{ width: 12 + depth * 10, height: 1 }} />
						<Text
							text={hasChildren ? (expanded ? '\u25BE' : '\u25B8') : '\u2022'}
							onClick={(e: any) => {
								e.stopPropagation()
								if (hasChildren) toggleExpanded(node.id)
							}}
							style={{ fontSize: 30, width: 20 }}
							color={hasChildren ? theme.iconText : theme.iconMuted}
						/>
						<View style={{ flexDirection: 'column', gap: 3, flexGrow: 1 }}>
							<View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
								<Text
									text={node.label}
									style={{ fontSize: 13, fontWeight: 700 }}
									color={theme.titleText}
								/>
								<View
									style={{
										height: 18,
										paddingHorizontal: 6,
										alignItems: 'center',
										justifyContent: 'center',
									}}
									background={theme.tagBg}
									borderRadius={5}
								>
									<Text text={node.type} style={{ fontSize: 10 }} color={theme.tagText} />
								</View>
								<Text text={node.code} style={{ fontSize: 10 }} color={theme.codeText} />
							</View>
							<View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
								<Text
									text={\`\u8D1F\u8D23\u4EBA \xB7 \${node.owner}\`}
									style={{ fontSize: 10 }}
									color={theme.labelText}
								/>
								<View
									style={{
										height: 16,
										paddingHorizontal: 6,
										alignItems: 'center',
										justifyContent: 'center',
									}}
									background={theme.countBg}
									borderRadius={5}
								>
									<Text
										text={\`\u6307\u6807 \${node.count}\`}
										style={{ fontSize: 10 }}
										color={theme.countText}
									/>
								</View>
							</View>
						</View>
						<View style={{ width: 70, alignItems: 'flex-end' }}>
							<Text
								text={hasChildren ? \`\${node.children.length} \u5B50\u7EA7\` : '\u53F6\u5B50\u8282\u70B9'}
								style={{ fontSize: 10 }}
								color={theme.metaText}
							/>
						</View>
					</View>
				)
			})
		: []
	const canvasRowsBuildMs = open ? now() - canvasRowsBuildStart : 0

	return (
		<div style={{ fontFamily: 'system-ui', maxWidth: 1180 }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
				{/* \u9876\u90E8\u5DE5\u5177\u680F\uFF1A\u6570\u636E\u89C4\u6A21\u3001\u4E3B\u9898\u4E0E\u5F00\u5173 */}
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
					<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
						\u603B\u6761\u6570
						<input
							type="number"
							min={1}
							value={draftTotalCount}
							onChange={(e) => {
								const v = Number(e.target.value)
								if (!Number.isFinite(v)) return
								setDraftTotalCount(v)
							}}
							style={{ width: 90 }}
						/>
					</label>
					<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
						\u6DF1\u5EA6
						<input
							type="number"
							min={1}
							max={32}
							value={draftMaxDepth}
							onChange={(e) => {
								const v = Number(e.target.value)
								if (!Number.isFinite(v)) return
								setDraftMaxDepth(v)
							}}
							style={{ width: 70 }}
						/>
					</label>
					<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
						\u4E3B\u9898
						<select
							value={themeName}
							onChange={(e) => setThemeName(e.target.value as 'dark' | 'light')}
							style={{ height: 28 }}
						>
							<option value="dark">Dark</option>
							<option value="light">Light</option>
						</select>
					</label>
					<button
						type="button"
						onClick={() => {
							const nextTotalCount = clampInt(draftTotalCount, 1, Number.MAX_SAFE_INTEGER)
							const nextMaxDepth = clampInt(draftMaxDepth, 1, 32)
							setDraftTotalCount(nextTotalCount)
							setDraftMaxDepth(nextMaxDepth)
							setTotalCount(nextTotalCount)
							setMaxDepth(nextMaxDepth)
							setDataVersion((v) => v + 1)
							setOpen(true)
						}}
						style={{
							padding: '5px 10px',
							borderRadius: 7,
							border: '1px solid rgba(0,0,0,0.15)',
							background: theme.buttonBg,
							color: theme.buttonText,
							cursor: 'pointer',
						}}
					>
						\u751F\u6210\u6570\u636E
					</button>
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						style={{
							padding: '5px 10px',
							borderRadius: 7,
							border: '1px solid rgba(0,0,0,0.15)',
							background: open ? '#111827' : theme.buttonBg,
							color: open ? '#ffffff' : theme.buttonText,
							cursor: 'pointer',
						}}
					>
						{open ? '\u6536\u8D77\u4E0B\u62C9' : '\u5C55\u5F00\u4E0B\u62C9'}
					</button>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
					<label style={{ fontSize: 12, color: 'rgba(17,24,39,0.75)' }}>Tree Select</label>
					<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
						<input
							readOnly
							value={selectedNode ? \`\${selectedNode.label} \xB7 \${selectedNode.code}\` : ''}
							placeholder="\u8BF7\u9009\u62E9\u4E00\u4E2A\u8282\u70B9"
							onClick={() => setOpen((v) => !v)}
							style={{
								flex: 1,
								height: 34,
								padding: '0 10px',
								borderRadius: 8,
								border: '1px solid rgba(0,0,0,0.2)',
								background: theme.inputBg,
								color: theme.inputText,
								boxShadow: open ? '0 0 0 2px rgba(59,130,246,0.18)' : 'none',
							}}
						/>
						<button
							type="button"
							onClick={() => setSelectedId(null)}
							style={{
								padding: '5px 10px',
								borderRadius: 7,
								border: '1px solid rgba(0,0,0,0.15)',
								background: theme.buttonBg,
								color: theme.buttonText,
								cursor: 'pointer',
							}}
						>
							\u6E05\u7A7A
						</button>
					</div>
				</div>

				{open ? (
					<div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
						<Canvas
							key={renderKey}
							width={width}
							height={height}
							dpr={dpr}
							clearColor={theme.canvasBg}
							fontFamily="system-ui"
							style={{ borderRadius: 12, border: '1px solid rgba(0,0,0,0.12)' }}
						>
							<View
								scrollY
								scrollbarY
								style={{ width, height, padding: 12, flexDirection: 'column', gap: 8 }}
							>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Text
										text="Canvas Tree \u4E0B\u62C9"
										style={{ fontSize: 15, fontWeight: 700 }}
										color={theme.titleText}
									/>
									<Text
										text={\`\u8282\u70B9 \${flatNodes.length} / \${totalCount} \xB7 build \${canvasRowsBuildMs.toFixed(2)}ms\`}
										style={{ fontSize: 11 }}
										color={theme.metaText}
									/>
								</View>
								<View
									scrollY
									scrollbarY
									scrollbarWidth={10}
									scrollbarInset={6}
									scrollbarTrackColor={theme.scrollbarTrack}
									scrollbarThumbColor={theme.scrollbarThumb}
									style={{
										flexGrow: 1,
										padding: 8,
										flexDirection: 'column',
										gap: 6,
									}}
									background={theme.panelBg}
									borderRadius={9}
								>
									{canvasRows}
								</View>
								<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
									<Text
										text="\u70B9\u51FB\u8282\u70B9\u9009\u4E2D\uFF0C\u70B9\u51FB\u7BAD\u5934\u5C55\u5F00/\u6536\u8D77"
										style={{ fontSize: 10 }}
										color={theme.metaText}
									/>
									<Text
										text="\u4E0B\u62C9\u5185\u5BB9\u5B8C\u5168\u7531 Canvas \u6E32\u67D3"
										style={{ fontSize: 10 }}
										color={theme.codeText}
									/>
								</View>
							</View>
						</Canvas>
					</div>
				) : null}
			</div>
		</div>
	)
}
`},14515:function(E,p){"use strict";p.Z=`// \u6811\u8282\u70B9\u7684\u6570\u636E\u7ED3\u6784\uFF1A\u7528\u4E8E\u751F\u6210\u539F\u59CB\u5C42\u7EA7\u6811
export type TreeNode = {
	id: string
	label: string
	code: string
	type: string
	owner: string
	count: number
	children: TreeNode[]
}

// \u5C55\u5F00\u540E\u7528\u4E8E\u6E32\u67D3\u7684\u6241\u5E73\u8282\u70B9\uFF1A\u5305\u542B\u5C42\u7EA7\u6DF1\u5EA6
export type FlatNode = {
	node: TreeNode
	depth: number
}

export const typePalette = ['\u7CFB\u7EDF', '\u6A21\u5757', '\u76EE\u5F55', '\u6570\u636E', '\u63A5\u53E3']
export const ownerPalette = ['\u5E73\u53F0\u7EC4', '\u6570\u636E\u7EC4', '\u589E\u957F\u7EC4', '\u4E1A\u52A1\u7EC4', '\u67B6\u6784\u7EC4']

export const themes = {
	dark: {
		canvasBg: '#0b1226',
		panelBg: 'rgba(15,23,42,0.9)',
		rowBg: 'rgba(148,163,184,0.08)',
		rowActive: 'rgba(59,130,246,0.35)',
		titleText: '#e2e8f0',
		metaText: '#94a3b8',
		labelText: '#cbd5f5',
		codeText: '#94a3b8',
		iconText: '#93c5fd',
		iconMuted: '#64748b',
		tagBg: 'rgba(59,130,246,0.2)',
		tagText: '#bfdbfe',
		countBg: 'rgba(34,197,94,0.2)',
		countText: '#86efac',
		scrollbarTrack: 'rgba(148,163,184,0.18)',
		scrollbarThumb: 'rgba(148,163,184,0.5)',
		inputBg: '#ffffff',
		inputText: '#0f172a',
		buttonBg: '#ffffff',
		buttonText: '#111827',
	},
	light: {
		canvasBg: '#f8fafc',
		panelBg: 'rgba(255,255,255,0.9)',
		rowBg: 'rgba(15,23,42,0.06)',
		rowActive: 'rgba(37,99,235,0.18)',
		titleText: '#0f172a',
		metaText: '#475569',
		labelText: '#334155',
		codeText: '#64748b',
		iconText: '#1d4ed8',
		iconMuted: '#94a3b8',
		tagBg: 'rgba(59,130,246,0.18)',
		tagText: '#1d4ed8',
		countBg: 'rgba(34,197,94,0.18)',
		countText: '#15803d',
		scrollbarTrack: 'rgba(100,116,139,0.2)',
		scrollbarThumb: 'rgba(100,116,139,0.55)',
		inputBg: '#ffffff',
		inputText: '#0f172a',
		buttonBg: '#ffffff',
		buttonText: '#111827',
	},
}

type TreePlan = {
	depth: number
	nodesPerLevel: number[]
	childCounts: number[][]
}

function clampInt(value: number, min: number, max: number) {
	if (!Number.isFinite(value)) return min
	return Math.max(min, Math.min(max, Math.trunc(value)))
}

function createRng(seed: number) {
	let state = (seed | 0) ^ 0x9e3779b9
	const nextU32 = () => {
		state = (Math.imul(state, 1664525) + 1013904223) | 0
		return state >>> 0
	}
	return {
		nextU32,
		nextInt(maxExclusive: number) {
			if (maxExclusive <= 0) return 0
			return nextU32() % maxExclusive
		},
	}
}

function planTree(total: number, maxDepth: number, seed = 0): TreePlan {
	const clampedTotal = clampInt(total, 1, Number.MAX_SAFE_INTEGER)
	const requestedDepth = clampInt(maxDepth, 1, 32)
	const depth = Math.max(1, Math.min(requestedDepth, clampedTotal))
	const rng = createRng(seed)

	const nodesPerLevel = new Array(depth).fill(1)
	nodesPerLevel[0] = 1

	if (depth > 1) {
		const remaining = clampedTotal - depth
		const weights = new Array(depth).fill(0).map((_, level) => (level === 0 ? 0 : depth - level))
		const weightSum = weights.reduce((acc, w) => acc + w, 0)
		const fractional: Array<{ level: number; frac: number }> = []
		let allocated = 0

		for (let level = 1; level < depth; level += 1) {
			const raw = (remaining * weights[level]) / weightSum
			const add = Math.floor(raw)
			nodesPerLevel[level] += add
			allocated += add
			fractional.push({ level, frac: raw - add })
		}

		const left = remaining - allocated
		fractional.sort((a, b) => (b.frac !== a.frac ? b.frac - a.frac : a.level - b.level))
		for (let i = 0; i < left; i += 1) {
			nodesPerLevel[fractional[i % fractional.length].level] += 1
		}
	}

	const childCounts: number[][] = []
	for (let level = 0; level < depth - 1; level += 1) {
		const parentCount = nodesPerLevel[level]
		const childTotal = nodesPerLevel[level + 1]
		const base = Math.floor(childTotal / parentCount)
		const rem = childTotal % parentCount
		const counts = new Array(parentCount).fill(base)
		const offset = rng.nextInt(parentCount)
		for (let i = 0; i < rem; i += 1) {
			counts[(offset + i) % parentCount] += 1
		}
		childCounts.push(counts)
	}

	return { depth, nodesPerLevel, childCounts }
}

export function buildTree(total: number, maxDepth: number, seed = 0) {
	const plan = planTree(total, maxDepth, seed)
	const seedOffset = Math.abs(seed) % 997
	let cursor = 0

	const makeNode = (): TreeNode => {
		const id = \`node-\${cursor}\`
		const index = cursor
		const variant = index + seedOffset
		cursor += 1
		return {
			id,
			label: \`\u8282\u70B9 \${index + 1}\`,
			code: \`T\${String(1000 + variant)}\`,
			type: typePalette[variant % typePalette.length],
			owner: ownerPalette[(variant * 3) % ownerPalette.length],
			count: 6 + ((variant * 7) % 42),
			children: [],
		}
	}

	const levels: TreeNode[][] = new Array(plan.depth)
	levels[0] = [makeNode()]
	for (let level = 0; level < plan.depth - 1; level += 1) {
		const parents = levels[level]
		const counts = plan.childCounts[level]
		const next: TreeNode[] = []
		for (let pIndex = 0; pIndex < parents.length; pIndex += 1) {
			const parent = parents[pIndex]
			const childCount = counts[pIndex] ?? 0
			for (let i = 0; i < childCount; i += 1) {
				const child = makeNode()
				parent.children.push(child)
				next.push(child)
			}
		}
		levels[level + 1] = next
	}

	return levels[0]
}

export function flattenTree(nodes: TreeNode[], expanded: Set<string>) {
	const list: FlatNode[] = []
	const walk = (items: TreeNode[], depth: number) => {
		for (const node of items) {
			list.push({ node, depth })
			if (node.children.length && expanded.has(node.id)) {
				walk(node.children, depth + 1)
			}
		}
	}
	walk(nodes, 0)
	return list
}
`},86222:function(E,p,t){var m=t(15274);function h(f,w){var l=typeof Symbol!="undefined"&&f[Symbol.iterator]||f["@@iterator"];if(!l){if(Array.isArray(f)||(l=m(f))||w&&f&&typeof f.length=="number"){l&&(f=l);var P=0,_=function(){};return{s:_,n:function(){return P>=f.length?{done:!0}:{done:!1,value:f[P++]}},e:function(n){throw n},f:_}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var e=!0,v=!1,g;return{s:function(){l=l.call(f)},n:function(){var n=l.next();return e=n.done,n},e:function(n){v=!0,g=n},f:function(){try{!e&&l.return!=null&&l.return()}finally{if(v)throw g}}}}E.exports=h,E.exports.__esModule=!0,E.exports.default=E.exports}}]);
