import{E as p,U as dt,T as he,k as D,c as Ue,F as T,s as U,M as C,a3 as re,R as se,w as Be,z as Fe,a0 as W,a1 as Re,b as A,B as v,D as L,aa as fe,N as J,ab as G,l as I,ac as ht,Z as Me,ad as pe,x as E,ae as ft,af as ie,J as K,ag as z,q as ne,t as pt,G as mt,Y as Z,m as Ge,p as De,a5 as Ae,a8 as ke,n as gt,o as xt,a6 as _t,a7 as bt,a9 as yt,ah as Tt,ai as vt,aj as ee,ak as wt,al as Pt,am as me,e as y,an as Ct}from"./index-BvZnwEnQ.js";import{S as V,c as Y,a as St,b as Ut,B as ze}from"./colorToUniform-DmtBy-2V.js";class Oe{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:s,clientHeight:i}=this._resizeTo;t=s,r=i}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Oe.extension=p.Application;class We{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,dt.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?he.shared:new he,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}We.extension=p.Application;class Ie{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}Ie.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"filter"};function Bt(o,e){e.clear();const t=e.matrix;for(let r=0;r<o.length;r++){const s=o[r];s.globalDisplayStatus<7||(e.matrix=s.worldTransform,e.addBounds(s.bounds))}return e.matrix=t,e}const Ft=new re({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class Rt{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new Fe,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0}}}class Ee{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new D({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Ue({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,s=this._pushFilterData();s.skip=!1,s.filters=r,s.container=e.container,s.outputRenderSurface=t.renderTarget.renderSurface;const i=t.renderTarget.renderTarget.colorTexture.source,n=i.resolution,a=i.antialias;if(r.length===0){s.skip=!0;return}const u=s.bounds;if(this._calculateFilterArea(e,u),this._calculateFilterBounds(s,t.renderTarget.rootViewPort,a,n,1),s.skip)return;const l=this._getPreviousFilterData(),h=this._findFilterResolution(n);let c=0,d=0;l&&(c=l.bounds.minX,d=l.bounds.minY),this._calculateGlobalFrame(s,c,d,h,i.width,i.height),this._setupFilterTextures(s,u,t,l)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const s=e.source,i=s.resolution,n=s.antialias;if(t.length===0)return r.skip=!0,e;const a=r.bounds;if(a.addRect(e.frame),this._calculateFilterBounds(r,a.rectangle,n,i,0),r.skip)return e;const u=i;this._calculateGlobalFrame(r,0,0,u,s.width,s.height),r.outputRenderSurface=T.getOptimalTexture(a.width,a.height,r.resolution,r.antialias),r.backTexture=U.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const d=r.outputRenderSurface;return d.source.alphaMode="premultiplied-alpha",d}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&T.returnTexture(t.backTexture),T.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const s=e.colorTexture.source._resolution,i=T.getOptimalTexture(t.width,t.height,s,!1);let n=t.minX,a=t.minY;r&&(n-=r.minX,a-=r.minY),n=Math.floor(n*s),a=Math.floor(a*s);const u=Math.ceil(t.width*s),l=Math.ceil(t.height*s);return this.renderer.renderTarget.copyToTexture(e,i,{x:n,y:a},{width:u,height:l},{x:0,y:0}),i}applyFilter(e,t,r,s){const i=this.renderer,n=this._activeFilterData,u=n.outputRenderSurface===r,l=i.renderTarget.rootRenderTarget.colorTexture.source._resolution,h=this._findFilterResolution(l);let c=0,d=0;if(u){const f=this._findPreviousFilterOffset();c=f.x,d=f.y}this._updateFilterUniforms(t,r,n,c,d,h,u,s),this._setupBindGroupsAndRender(e,t,i)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,s=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),i=t.worldTransform.copyTo(C.shared),n=t.renderGroup||t.parentRenderGroup;return n&&n.cacheToLocalTransform&&i.prepend(n.cacheToLocalTransform),i.invert(),s.prepend(i),s.scale(1/t.texture.orig.width,1/t.texture.orig.height),s.translate(t.anchor.x,t.anchor.y),s}destroy(){}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const s=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(s,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:Ft,shader:e,state:e._state,topology:"triangle-list"}),r.type===se.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,s){if(e.backTexture=U.EMPTY,e.blendRequired){r.renderTarget.finishRenderPass();const i=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(i,t,s==null?void 0:s.bounds)}e.inputTexture=T.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,s,i,n){const a=e.globalFrame;a.x=t*s,a.y=r*s,a.width=i*s,a.height=n*s}_updateFilterUniforms(e,t,r,s,i,n,a,u){const l=this._filterGlobalUniforms.uniforms,h=l.uOutputFrame,c=l.uInputSize,d=l.uInputPixel,f=l.uInputClamp,x=l.uGlobalFrame,_=l.uOutputTexture;a?(h[0]=r.bounds.minX-s,h[1]=r.bounds.minY-i):(h[0]=0,h[1]=0),h[2]=e.frame.width,h[3]=e.frame.height,c[0]=e.source.width,c[1]=e.source.height,c[2]=1/c[0],c[3]=1/c[1],d[0]=e.source.pixelWidth,d[1]=e.source.pixelHeight,d[2]=1/d[0],d[3]=1/d[1],f[0]=.5*d[2],f[1]=.5*d[3],f[2]=e.frame.width*c[2]-.5*d[2],f[3]=e.frame.height*c[3]-.5*d[3];const m=this.renderer.renderTarget.rootRenderTarget.colorTexture;x[0]=s*n,x[1]=i*n,x[2]=m.source.width*n,x[3]=m.source.height*n,t instanceof U&&(t.source.resource=null);const g=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!u),t instanceof U?(_[0]=t.frame.width,_[1]=t.frame.height):(_[0]=g.width,_[1]=g.height),_[2]=g.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const s=this._filterStack[r];if(!s.skip){e=s.bounds.minX,t=s.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?Bt(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const s=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;s&&t.applyMatrix(s)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,s=e.bounds,i=e.filters;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),i.length===1)i[0].apply(this,r,e.outputRenderSurface,t);else{let n=e.inputTexture;const a=T.getOptimalTexture(s.width,s.height,n.source._resolution,!1);let u=a,l=0;for(l=0;l<i.length-1;++l){i[l].apply(this,n,u,!0);const c=n;n=u,u=c}i[l].apply(this,n,e.outputRenderSurface,t),T.returnTexture(a)}}_calculateFilterBounds(e,t,r,s,i){var _;const n=this.renderer,a=e.bounds,u=e.filters;let l=1/0,h=0,c=!0,d=!1,f=!1,x=!0;for(let m=0;m<u.length;m++){const g=u[m];if(l=Math.min(l,g.resolution==="inherit"?s:g.resolution),h+=g.padding,g.antialias==="off"?c=!1:g.antialias==="inherit"&&c&&(c=r),g.clipToViewport||(x=!1),!!!(g.compatibleRenderers&n.type)){f=!1;break}if(g.blendRequired&&!(((_=n.backBuffer)==null?void 0:_.useBackBuffer)??!0)){Be("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),f=!1;break}f=g.enabled||f,d||(d=g.blendRequired)}if(!f){e.skip=!0;return}if(x&&a.fitBounds(0,t.width/s,0,t.height/s),a.scale(l).ceil().scale(1/l).pad((h|0)*i),!a.isPositive){e.skip=!0;return}e.antialias=c,e.resolution=l,e.blendRequired=d}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>1&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new Rt),this._filterStackIndex++,e}}Ee.extension={type:[p.WebGLSystem,p.WebGPUSystem],name:"filter"};const Ve=class Le extends re{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(W(Re,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...Le.defaultOptions,...t};const r=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let s=t.uvs;s||(t.positions?s=new Float32Array(r.length):s=new Float32Array([0,0,1,0,1,1,0,1]));const i=t.indices||new Uint32Array([0,1,2,0,2,3]),n=t.shrinkBuffersToFit,a=new A({data:r,label:"attribute-mesh-positions",shrinkToFit:n,usage:v.VERTEX|v.COPY_DST}),u=new A({data:s,label:"attribute-mesh-uvs",shrinkToFit:n,usage:v.VERTEX|v.COPY_DST}),l=new A({data:i,label:"index-mesh-buffer",shrinkToFit:n,usage:v.INDEX|v.COPY_DST});super({attributes:{aPosition:{buffer:a,format:"float32x2",stride:8,offset:0},aUV:{buffer:u,format:"float32x2",stride:8,offset:0}},indexBuffer:l,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};Ve.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let ae=Ve,F=null,P=null;function Mt(o,e){F||(F=L.get().createCanvas(256,128),P=F.getContext("2d",{willReadFrequently:!0}),P.globalCompositeOperation="copy",P.globalAlpha=1),(F.width<o||F.height<e)&&(F.width=fe(o),F.height=fe(e))}function ge(o,e,t){for(let r=0,s=4*t*e;r<e;++r,s+=4)if(o[s+3]!==0)return!1;return!0}function xe(o,e,t,r,s){const i=4*e;for(let n=r,a=r*i+4*t;n<=s;++n,a+=i)if(o[a+3]!==0)return!1;return!0}function Gt(...o){let e=o[0];e.canvas||(e={canvas:o[0],resolution:o[1]});const{canvas:t}=e,r=Math.min(e.resolution??1,1),s=e.width??t.width,i=e.height??t.height;let n=e.output;if(Mt(s,i),!P)throw new TypeError("Failed to get canvas 2D context");P.drawImage(t,0,0,s,i,0,0,s*r,i*r);const u=P.getImageData(0,0,s,i).data;let l=0,h=0,c=s-1,d=i-1;for(;h<i&&ge(u,s,h);)++h;if(h===i)return J.EMPTY;for(;ge(u,s,d);)--d;for(;xe(u,s,l,h,d);)++l;for(;xe(u,s,c,h,d);)--c;return++c,++d,P.globalCompositeOperation="source-over",P.strokeRect(l,h,c-l,d-h),P.globalCompositeOperation="copy",n??(n=new J),n.set(l/r,h/r,(c-l)/r,(d-h)/r),n}const _e=new J;class Dt{getCanvasAndContext(e){const{text:t,style:r,resolution:s=1}=e,i=r._getFinalPadding(),n=G.measureText(t||" ",r),a=Math.ceil(Math.ceil(Math.max(1,n.width)+i*2)*s),u=Math.ceil(Math.ceil(Math.max(1,n.height)+i*2)*s),l=I.getOptimalCanvasAndContext(a,u);this._renderTextToCanvas(t,r,i,s,l);const h=r.trim?Gt({canvas:l.canvas,width:a,height:u,resolution:1,output:_e}):_e.set(0,0,a,u);return{canvasAndContext:l,frame:h}}returnCanvasAndContext(e){I.returnCanvasAndContext(e)}_renderTextToCanvas(e,t,r,s,i){var B,k,w,M;const{canvas:n,context:a}=i,u=ht(t),l=G.measureText(e||" ",t),h=l.lines,c=l.lineHeight,d=l.lineWidths,f=l.maxLineWidth,x=l.fontProperties,_=n.height;if(a.resetTransform(),a.scale(s,s),a.textBaseline=t.textBaseline,(B=t._stroke)!=null&&B.width){const S=t._stroke;a.lineWidth=S.width,a.miterLimit=S.miterLimit,a.lineJoin=S.join,a.lineCap=S.cap}a.font=u;let m,g;const R=t.dropShadow?2:1;for(let S=0;S<R;++S){const le=t.dropShadow&&S===0,X=le?Math.ceil(Math.max(1,_)+r*2):0,ot=X*s;if(le){a.fillStyle="black",a.strokeStyle="black";const b=t.dropShadow,lt=b.color,ut=b.alpha;a.shadowColor=Me.shared.setValue(lt).setAlpha(ut).toRgbaString();const ct=b.blur*s,de=b.distance*s;a.shadowBlur=ct,a.shadowOffsetX=Math.cos(b.angle)*de,a.shadowOffsetY=Math.sin(b.angle)*de+ot}else{if(a.fillStyle=t._fill?pe(t._fill,a,l,r*2):null,(k=t._stroke)!=null&&k.width){const b=t._stroke.width*.5+r*2;a.strokeStyle=pe(t._stroke,a,l,b)}a.shadowColor="black"}let ue=(c-x.fontSize)/2;c-x.fontSize<0&&(ue=0);const ce=((w=t._stroke)==null?void 0:w.width)??0;for(let b=0;b<h.length;b++)m=ce/2,g=ce/2+b*c+x.ascent+ue,t.align==="right"?m+=f-d[b]:t.align==="center"&&(m+=(f-d[b])/2),(M=t._stroke)!=null&&M.width&&this._drawLetterSpacing(h[b],t,i,m+r,g+r-X,!0),t._fill!==void 0&&this._drawLetterSpacing(h[b],t,i,m+r,g+r-X)}}_drawLetterSpacing(e,t,r,s,i,n=!1){const{context:a}=r,u=t.letterSpacing;let l=!1;if(G.experimentalLetterSpacingSupported&&(G.experimentalLetterSpacing?(a.letterSpacing=`${u}px`,a.textLetterSpacing=`${u}px`,l=!0):(a.letterSpacing="0px",a.textLetterSpacing="0px")),u===0||l){n?a.strokeText(e,s,i):a.fillText(e,s,i);return}let h=s;const c=G.graphemeSegmenter(e);let d=a.measureText(e).width,f=0;for(let x=0;x<c.length;++x){const _=c[x];n?a.strokeText(_,h,i):a.fillText(_,h,i);let m="";for(let g=x+1;g<c.length;++g)m+=c[g];f=a.measureText(m).width,h+=d-f+u,d=f}}}const H=new Dt,be="http://www.w3.org/2000/svg",ye="http://www.w3.org/1999/xhtml";class Ye{constructor(){this.svgRoot=document.createElementNS(be,"svg"),this.foreignObject=document.createElementNS(be,"foreignObject"),this.domElement=document.createElementNS(ye,"div"),this.styleElement=document.createElementNS(ye,"style");const{foreignObject:e,svgRoot:t,styleElement:r,domElement:s}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(s),this.image=L.get().createImage()}}let Te;function At(o,e,t,r){r||(r=Te||(Te=new Ye));const{domElement:s,styleElement:i,svgRoot:n}=r;s.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${o}</div>`,s.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(i.textContent=t),document.body.appendChild(n);const a=s.getBoundingClientRect();n.remove();const u=e.padding*2;return{width:a.width-u,height:a.height-u}}class kt{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{E.return(e)}),this.batches.length=0}}class Xe{constructor(e,t){this.state=V.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,s=this.renderer.graphicsContext.updateGpuContext(t);return!!(s.isBatchable||r!==s.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let s=0;s<r.length;s++){const i=r[s];i._batcher.updateElement(i)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const i=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const n=i.resources.localUniforms.uniforms;n.uTransformMatrix=e.groupTransform,n.uRound=t._roundPixels|e._roundPixels,Y(e.groupColorAlpha,n.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,s=this._getGpuDataForRenderable(e).batches;for(let i=0;i<s.length;i++){const n=s[i];r.addToBatch(n,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new kt;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){const r=e.context,s=this.renderer.graphicsContext.getGpuContext(r),i=this.renderer._roundPixels|e._roundPixels;t.batches=s.batches.map(n=>{const a=E.get(ft);return n.copyTo(a),a.renderable=e,a.roundPixels=i,a})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}Xe.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"graphics"};const He=class Ne extends ae{constructor(...e){super({});let t=e[0]??{};typeof t=="number"&&(W(Re,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:e[1],verticesX:e[2],verticesY:e[3]}),this.build(t)}build(e){e={...Ne.defaultOptions,...e},this.verticesX=this.verticesX??e.verticesX,this.verticesY=this.verticesY??e.verticesY,this.width=this.width??e.width,this.height=this.height??e.height;const t=this.verticesX*this.verticesY,r=[],s=[],i=[],n=this.verticesX-1,a=this.verticesY-1,u=this.width/n,l=this.height/a;for(let c=0;c<t;c++){const d=c%this.verticesX,f=c/this.verticesX|0;r.push(d*u,f*l),s.push(d/n,f/a)}const h=n*a;for(let c=0;c<h;c++){const d=c%n,f=c/n|0,x=f*this.verticesX+d,_=f*this.verticesX+d+1,m=(f+1)*this.verticesX+d,g=(f+1)*this.verticesX+d+1;i.push(x,_,m,_,g,m)}this.buffers[0].data=new Float32Array(r),this.buffers[1].data=new Float32Array(s),this.indexBuffer.data=new Uint32Array(i),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};He.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};let zt=He;class oe{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let s=r;const i=this.texture.textureMatrix;return i.isSimple||(s=this._transformedUvs,(this._textureMatrixUpdateId!==i._updateID||this._uvUpdateId!==t._updateID)&&((!s||s.length<r.length)&&(s=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=i._updateID,this._uvUpdateId=t._updateID,i.multiplyUvs(r,s))),s}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class ve{destroy(){}}class $e{constructor(e,t){this.localUniforms=new D({uTransformMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new Ue({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,s=e.batched;if(t.batched=s,r!==s)return!0;if(s){const i=e._geometry;if(i.indices.length!==t.indexSize||i.positions.length!==t.vertexSize)return t.indexSize=i.indices.length,t.vertexSize=i.positions.length,!0;const n=this._getBatchableMesh(e);return n.texture.uid!==e._texture.uid&&(n._textureMatrixUpdateId=-1),!n._batcher.checkAndUpdateTexture(n,e._texture)}return!1}addRenderable(e,t){var i,n;const r=this.renderer.renderPipes.batch,s=this._getMeshData(e);if(e.didViewUpdate&&(s.indexSize=(i=e._geometry.indices)==null?void 0:i.length,s.vertexSize=(n=e._geometry.positions)==null?void 0:n.length),s.batched){const a=this._getBatchableMesh(e);a.setTexture(e._texture),a.geometry=e._geometry,r.addToBatch(a,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=ie(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),Y(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new ve),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new ve),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new oe;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}$e.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"mesh"};class Ot{execute(e,t){const r=e.state,s=e.renderer,i=t.shader||e.defaultShader;i.resources.uTexture=t.texture._source,i.resources.uniforms=e.localUniforms;const n=s.gl,a=e.getBuffers(t);s.shader.bind(i),s.state.set(r),s.geometry.bind(a.geometry,i.glProgram);const l=a.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?n.UNSIGNED_SHORT:n.UNSIGNED_INT;n.drawElements(n.TRIANGLES,t.particleChildren.length*6,l,0)}}class Wt{execute(e,t){const r=e.renderer,s=t.shader||e.defaultShader;s.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),s.groups[1]=r.texture.getTextureBindGroup(t.texture);const i=e.state,n=e.getBuffers(t);r.encoder.draw({geometry:n.geometry,shader:t.shader||e.defaultShader,state:i,size:t.particleChildren.length*6})}}function we(o,e=null){const t=o*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,s=0;r<t;r+=6,s+=4)e[r+0]=s+0,e[r+1]=s+1,e[r+2]=s+2,e[r+3]=s+0,e[r+4]=s+2,e[r+5]=s+3;return e}function It(o){return{dynamicUpdate:Pe(o,!0),staticUpdate:Pe(o,!1)}}function Pe(o,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const i in o){const n=o[i];if(e!==n.dynamic)continue;t.push(`offset = index + ${r}`),t.push(n.code);const a=K(n.format);r+=a.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const s=t.join(`
`);return new Function("ps","f32v","u32v",s)}class Et{constructor(e){this._size=0,this._generateParticleUpdateCache={};const t=this._size=e.size??1e3,r=e.properties;let s=0,i=0;for(const h in r){const c=r[h],d=K(c.format);c.dynamic?i+=d.stride:s+=d.stride}this._dynamicStride=i/4,this._staticStride=s/4,this.staticAttributeBuffer=new z(t*4*s),this.dynamicAttributeBuffer=new z(t*4*i),this.indexBuffer=we(t);const n=new re;let a=0,u=0;this._staticBuffer=new A({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:v.VERTEX|v.COPY_DST}),this._dynamicBuffer=new A({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:v.VERTEX|v.COPY_DST});for(const h in r){const c=r[h],d=K(c.format);c.dynamic?(n.addAttribute(c.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:a*4,format:c.format}),a+=d.size):(n.addAttribute(c.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:u*4,format:c.format}),u+=d.size)}n.addIndex(this.indexBuffer);const l=this.getParticleUpdate(r);this._dynamicUpload=l.dynamicUpdate,this._staticUpload=l.staticUpdate,this.geometry=n}getParticleUpdate(e){const t=Vt(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return It(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new z(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new z(this._size*this._dynamicStride*4*4),this.indexBuffer=we(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const s=this.staticAttributeBuffer;this._staticUpload(e,s.float32View,s.uint32View),this._staticBuffer.setDataWithSize(s.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function Vt(o){const e=[];for(const t in o){const r=o[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var Lt=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,Yt=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,Ce=`
struct ParticleUniforms {
  uProjectionMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uResolution:vec2<f32>,
  uRoundPixels:f32,
};

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   let position = vec4((uniforms.uProjectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class Xt extends ne{constructor(){const e=pt.from({vertex:Yt,fragment:Lt}),t=mt.from({fragment:{source:Ce,entryPoint:"mainFragment"},vertex:{source:Ce,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:U.WHITE.source,uSampler:new Z({}),uniforms:{uTranslationMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Me(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class je{constructor(e,t){this.state=V.for2d(),this.localUniforms=new D({uTranslationMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new Xt,this.state=V.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new Et({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,s=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const i=this.state;s.update(t,e._childrenDirty),e._childrenDirty=!1,i.blendMode=ie(e.blendMode,e.texture._source);const n=this.localUniforms.uniforms,a=n.uTranslationMatrix;e.worldTransform.copyTo(a),a.prepend(r.globalUniforms.globalUniformData.projectionMatrix),n.uResolution=r.globalUniforms.globalUniformData.resolution,n.uRound=r._roundPixels|e._roundPixels,Y(e.groupColorAlpha,n.uColor,0),this.adaptor.execute(this,e)}destroy(){this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class qe extends je{constructor(e){super(e,new Ot)}}qe.extension={type:[p.WebGLPipes],name:"particle"};class Qe extends je{constructor(e){super(e,new Wt)}}Qe.extension={type:[p.WebGPUPipes],name:"particle"};const Je=class Ke extends zt{constructor(e={}){e={...Ke.defaultOptions,...e},super({width:e.width,height:e.height,verticesX:4,verticesY:4}),this.update(e)}update(e){var t,r;this.width=e.width??this.width,this.height=e.height??this.height,this._originalWidth=e.originalWidth??this._originalWidth,this._originalHeight=e.originalHeight??this._originalHeight,this._leftWidth=e.leftWidth??this._leftWidth,this._rightWidth=e.rightWidth??this._rightWidth,this._topHeight=e.topHeight??this._topHeight,this._bottomHeight=e.bottomHeight??this._bottomHeight,this._anchorX=(t=e.anchor)==null?void 0:t.x,this._anchorY=(r=e.anchor)==null?void 0:r.y,this.updateUvs(),this.updatePositions()}updatePositions(){const e=this.positions,{width:t,height:r,_leftWidth:s,_rightWidth:i,_topHeight:n,_bottomHeight:a,_anchorX:u,_anchorY:l}=this,h=s+i,c=t>h?1:t/h,d=n+a,f=r>d?1:r/d,x=Math.min(c,f),_=u*t,m=l*r;e[0]=e[8]=e[16]=e[24]=-_,e[2]=e[10]=e[18]=e[26]=s*x-_,e[4]=e[12]=e[20]=e[28]=t-i*x-_,e[6]=e[14]=e[22]=e[30]=t-_,e[1]=e[3]=e[5]=e[7]=-m,e[9]=e[11]=e[13]=e[15]=n*x-m,e[17]=e[19]=e[21]=e[23]=r-a*x-m,e[25]=e[27]=e[29]=e[31]=r-m,this.getBuffer("aPosition").update()}updateUvs(){const e=this.uvs;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1;const t=1/this._originalWidth,r=1/this._originalHeight;e[2]=e[10]=e[18]=e[26]=t*this._leftWidth,e[9]=e[11]=e[13]=e[15]=r*this._topHeight,e[4]=e[12]=e[20]=e[28]=1-t*this._rightWidth,e[17]=e[19]=e[21]=e[23]=1-r*this._bottomHeight,this.getBuffer("aUV").update()}};Je.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};let Ht=Je;class Nt extends oe{constructor(){super(),this.geometry=new Ht}destroy(){this.geometry.destroy()}}class Ze{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new Nt,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._renderer=null}}Ze.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"nineSliceSprite"};const $t={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},jt={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let N,$;class qt extends ne{constructor(){N??(N=Ge({name:"tiling-sprite-shader",bits:[St,$t,De]})),$??($=Ae({name:"tiling-sprite-shader",bits:[Ut,jt,ke]}));const e=new D({uMapCoord:{value:new C,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new C,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:$,gpuProgram:N,resources:{localUniforms:new D({uTransformMatrix:{value:new C,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:U.EMPTY.source,uSampler:U.EMPTY.source.style}})}updateUniforms(e,t,r,s,i,n){const a=this.resources.tilingUniforms,u=n.width,l=n.height,h=n.textureMatrix,c=a.uniforms.uTextureTransform;c.set(r.a*u/e,r.b*u/t,r.c*l/e,r.d*l/t,r.tx/e,r.ty/t),c.invert(),a.uniforms.uMapCoord=h.mapCoord,a.uniforms.uClampFrame=h.uClampFrame,a.uniforms.uClampOffset=h.uClampOffset,a.uniforms.uTextureTransform=c,a.uniforms.uSizeAnchor[0]=e,a.uniforms.uSizeAnchor[1]=t,a.uniforms.uSizeAnchor[2]=s,a.uniforms.uSizeAnchor[3]=i,n&&(this.resources.uTexture=n.source,this.resources.uSampler=n.source.style)}}class Qt extends ae{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function Jt(o,e){const t=o.anchor.x,r=o.anchor.y;e[0]=-t*o.width,e[1]=-r*o.height,e[2]=(1-t)*o.width,e[3]=-r*o.height,e[4]=(1-t)*o.width,e[5]=(1-r)*o.height,e[6]=-t*o.width,e[7]=(1-r)*o.height}function Kt(o,e,t,r){let s=0;const i=o.length/e,n=r.a,a=r.b,u=r.c,l=r.d,h=r.tx,c=r.ty;for(t*=e;s<i;){const d=o[t],f=o[t+1];o[t]=n*d+u*f+h,o[t+1]=a*d+l*f+c,t+=e,s++}}function Zt(o,e){const t=o.texture,r=t.frame.width,s=t.frame.height;let i=0,n=0;o.applyAnchorToTexture&&(i=o.anchor.x,n=o.anchor.y),e[0]=e[6]=-i,e[2]=e[4]=1-i,e[1]=e[3]=-n,e[5]=e[7]=1-n;const a=C.shared;a.copyFrom(o._tileTransform.matrix),a.tx/=o.width,a.ty/=o.height,a.invert(),a.scale(o.width/r,o.height/s),Kt(e,2,0,a)}const O=new Qt;class er{constructor(){this.canBatch=!0,this.geometry=new ae({indices:O.indices.slice(),positions:O.positions.slice(),uvs:O.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}class et{constructor(e){this._state=V.default2d,this._renderer=e}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const s=t.canBatch;if(s&&s===r){const{batchableMesh:i}=t;return!i._batcher.checkAndUpdateTexture(i,e.texture)}return r!==s}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const s=this._getTilingSpriteData(e),{geometry:i,canBatch:n}=s;if(n){s.batchableMesh||(s.batchableMesh=new oe);const a=s.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=i,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(a,t)}else r.break(t),s.shader||(s.shader=new qt),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,Y(e.groupColorAlpha,r.uColor,0),this._state.blendMode=ie(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:O,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:s}=t;e.didViewUpdate&&this._updateBatchableMesh(e),s._batcher.updateElement(s)}else if(e.didViewUpdate){const{shader:s}=t;s.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new er;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,s=e.texture.source.style;s.addressMode!=="repeat"&&(s.addressMode="repeat",s.update()),Zt(e,r.uvs),Jt(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let s=!0;return this._renderer.type===se.WEBGL&&(s=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(s||r.source.isPowerOfTwo),t.canBatch}}et.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"tilingSprite"};const tr={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},rr={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},sr={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},ir={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let j,q;class nr extends ne{constructor(e){const t=new D({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new C,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});j??(j=Ge({name:"sdf-shader",bits:[gt,xt(e),tr,sr,De]})),q??(q=Ae({name:"sdf-shader",bits:[_t,bt(e),rr,ir,ke]})),super({glProgram:q,gpuProgram:j,resources:{localUniforms:t,batchSamplers:yt(e)}})}}class ar extends wt{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class tt{constructor(e){this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_gpuBitmapText")}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);Se(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);Se(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,s=Tt.getFont(e.text,e._style);r.clear(),s.distanceField.type!=="none"&&(r.customShader||(r.customShader=new nr(this._renderer.limits.maxBatchableTextures)));const i=G.graphemeSegmenter(e.text),n=e._style;let a=s.baseLineOffset;const u=vt(i,n,s,!0),l=n.padding,h=u.scale;let c=u.width,d=u.height+u.offsetY;n._stroke&&(c+=n._stroke.width/h,d+=n._stroke.width/h),r.translate(-e._anchor._x*c-l,-e._anchor._y*d-l).scale(h,h);const f=s.applyFillAsTint?n._fill.color:16777215;let x=s.fontMetrics.fontSize,_=s.lineHeight;n.lineHeight&&(x=n.fontSize/h,_=n.lineHeight/h);let m=(_-x)/2;m-s.baseLineOffset<0&&(m=0);for(let g=0;g<u.lines.length;g++){const R=u.lines[g];for(let B=0;B<R.charPositions.length;B++){const k=R.chars[B],w=s.chars[k];if(w!=null&&w.texture){const M=w.texture;r.texture(M,f||"black",Math.round(R.charPositions[B]+w.xOffset),Math.round(a+w.yOffset+m),M.orig.width,M.orig.height)}}a+=_}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new ar;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,s=ee.get(`${r}-bitmap`),{a:i,b:n,c:a,d:u}=e.groupTransform,l=Math.sqrt(i*i+n*n),h=Math.sqrt(a*a+u*u),c=(Math.abs(l)+Math.abs(h))/2,d=s.baseRenderedFontSize/e._style.fontSize,f=c*s.distanceField.range*(1/d);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._renderer=null}}tt.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"bitmapText"};function Se(o,e){e.groupTransform=o.groupTransform,e.groupColorAlpha=o.groupColorAlpha,e.groupColor=o.groupColor,e.groupBlendMode=o.groupBlendMode,e.globalDisplayStatus=o.globalDisplayStatus,e.groupTransform=o.groupTransform,e.localDisplayStatus=o.localDisplayStatus,e.groupAlpha=o.groupAlpha,e._roundPixels=o._roundPixels}class or extends ze{constructor(e){super(),this.generatingTexture=!1,this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){this._renderer.htmlText.returnTexturePromise(this.texturePromise),this.texturePromise=null,this._renderer=null}}function te(o,e){const{texture:t,bounds:r}=o,s=e._style._getFinalPadding();Pt(r,e._anchor,t);const i=e._anchor._x*s*2,n=e._anchor._y*s*2;r.minX-=s-i,r.minY-=s-n,r.maxX-=s-i,r.maxY-=s-n}class rt{constructor(e){this._renderer=e}validateRenderable(e){return e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);e._didTextUpdate&&(this._updateGpuText(e).catch(s=>{console.error(s)}),e._didTextUpdate=!1,te(r,e)),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;t.texturePromise&&(this._renderer.htmlText.returnTexturePromise(t.texturePromise),t.texturePromise=null),t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const r=this._renderer.htmlText.getTexturePromise(e);t.texturePromise=r,t.texture=await r;const s=e.renderGroup||e.parentRenderGroup;s&&(s.structureDidChange=!0),t.generatingTexture=!1,te(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new or(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=U.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}rt.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"htmlText"};function lr(){const{userAgent:o}=L.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(o)}const ur=new Fe;function st(o,e,t,r){const s=ur;s.minX=0,s.minY=0,s.maxX=o.width/r|0,s.maxY=o.height/r|0;const i=T.getOptimalTexture(s.width,s.height,r,!1);return i.source.uploadMethodId="image",i.source.resource=o,i.source.alphaMode="premultiply-alpha-on-upload",i.frame.width=e/r,i.frame.height=t/r,i.source.emit("update",i.source),i.updateUvs(),i}function cr(o,e){const t=e.fontFamily,r=[],s={},i=/font-family:([^;"\s]+)/g,n=o.match(i);function a(u){s[u]||(r.push(u),s[u]=!0)}if(Array.isArray(t))for(let u=0;u<t.length;u++)a(t[u]);else a(t);n&&n.forEach(u=>{const l=u.split(":")[1].trim();a(l)});for(const u in e.tagStyles){const l=e.tagStyles[u].fontFamily;a(l)}return r}async function dr(o){const t=await(await L.get().fetch(o)).blob(),r=new FileReader;return await new Promise((i,n)=>{r.onloadend=()=>i(r.result),r.onerror=n,r.readAsDataURL(t)})}async function hr(o,e){const t=await dr(e);return`@font-face {
        font-family: "${o.fontFamily}";
        font-weight: ${o.fontWeight};
        font-style: ${o.fontStyle};
        src: url('${t}');
    }`}const Q=new Map;async function fr(o){const e=o.filter(t=>ee.has(`${t}-and-url`)).map(t=>{if(!Q.has(t)){const{entries:r}=ee.get(`${t}-and-url`),s=[];r.forEach(i=>{const n=i.url,u=i.faces.map(l=>({weight:l.weight,style:l.style}));s.push(...u.map(l=>hr({fontWeight:l.weight,fontStyle:l.style,fontFamily:t},n)))}),Q.set(t,Promise.all(s).then(i=>i.join(`
`)))}return Q.get(t)});return(await Promise.all(e)).join(`
`)}function pr(o,e,t,r,s){const{domElement:i,styleElement:n,svgRoot:a}=s;i.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${o}</div>`,i.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),n.textContent=r;const{width:u,height:l}=s.image;return a.setAttribute("width",u.toString()),a.setAttribute("height",l.toString()),new XMLSerializer().serializeToString(a)}function mr(o,e){const t=I.getOptimalCanvasAndContext(o.width,o.height,e),{context:r}=t;return r.clearRect(0,0,o.width,o.height),r.drawImage(o,0,0),t}function gr(o,e,t){return new Promise(async r=>{t&&await new Promise(s=>setTimeout(s,100)),o.onload=()=>{r()},o.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,o.crossOrigin="anonymous"})}class it{constructor(e){this._renderer=e,this._createCanvas=e.type===se.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:t,style:r,resolution:s,textureStyle:i}=e,n=E.get(Ye),a=cr(t,r),u=await fr(a),l=At(t,r,u,n),h=Math.ceil(Math.ceil(Math.max(1,l.width)+r.padding*2)*s),c=Math.ceil(Math.ceil(Math.max(1,l.height)+r.padding*2)*s),d=n.image,f=2;d.width=(h|0)+f,d.height=(c|0)+f;const x=pr(t,r,s,u,n);await gr(d,x,lr()&&a.length>0);const _=d;let m;this._createCanvas&&(m=mr(d,s));const g=st(m?m.canvas:_,d.width-f,d.height-f,s);return i&&(g.source.style=i),this._createCanvas&&(this._renderer.texture.initSource(g.source),I.returnCanvasAndContext(m)),E.return(n),g}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{Be("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){T.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null}}it.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"htmlText"};class xr extends ze{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){this._renderer.canvasText.returnTexture(this.texture),this._renderer=null}}class nt{constructor(e){this._renderer=e}validateRenderable(e){return e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);e._didTextUpdate&&(this._updateGpuText(e),e._didTextUpdate=!1),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.returnTexture(t.texture),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getTexture(e),te(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new xr(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}nt.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"text"};class at{constructor(e){this._renderer=e}getTexture(e,t,r,s){typeof e=="string"&&(W("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof me||(e.style=new me(e.style)),e.textureStyle instanceof Z||(e.textureStyle=new Z(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:i,style:n,textureStyle:a}=e,u=e.resolution??this._renderer.resolution,{frame:l,canvasAndContext:h}=H.getCanvasAndContext({text:i,style:n,resolution:u}),c=st(h.canvas,l.width,l.height,u);if(a&&(c.source.style=a),n.trim&&(l.pad(n.padding),c.frame.copyFrom(l),c.frame.scale(1/u),c.updateUvs()),n.filters){const d=this._applyFilters(c,n.filters);return this.returnTexture(c),H.returnCanvasAndContext(h),d}return this._renderer.texture.initSource(c._source),H.returnCanvasAndContext(h),c}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",T.returnTexture(e,!0)}renderTextToCanvas(){W("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,s=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),s}destroy(){this._renderer=null}}at.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"canvasText"};y.add(Oe);y.add(We);y.add(Xe);y.add(Ct);y.add($e);y.add(qe);y.add(Qe);y.add(at);y.add(nt);y.add(tt);y.add(it);y.add(rt);y.add(et);y.add(Ze);y.add(Ee);y.add(Ie);
