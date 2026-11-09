(function(){
  var b=document.querySelector('.burger'),m=document.getElementById('menu');
  function set(o){b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú');m.classList.toggle('open',o)}
  b.addEventListener('click',function(){set(b.getAttribute('aria-expanded')!=='true')});
  m.addEventListener('click',function(e){if(e.target.tagName==='A')set(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&b.getAttribute('aria-expanded')==='true'){set(false);b.focus()}});
})();
