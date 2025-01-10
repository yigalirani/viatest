import type { Trips } from 'server';
async function getcontent(url:string) {
  const response = await fetch(url);
  return await response.json();
}
async function run_app(){
  const body = document.querySelector('body');
  if (!body)
    return
  const list = await getcontent('/get_list') as string[];
  body.innerHTML = '<ol>'+list.map((s:string) => '<li draggable=true>'+s +'</li>').join('\n')+'</ol>';
}
run_app()