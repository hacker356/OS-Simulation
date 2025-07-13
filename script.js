// Tab functionality
document.querySelectorAll('.tab li').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-content').forEach(el=>el.classList.remove('active'))
    document.querySelectorAll('.tab li').forEach(el=>el.classList.remove('active'))
    document.querySelector(tab.dataset.target).classList.add('active')
    tab.classList.add('active')
  })
});

// Gantt renderer
function renderGantt(gantt) {
  const colors = ['#ff7675', '#fdcb6e', '#55efc4', '#74b9ff', '#a29bfe'];

  const ganttHTML = gantt.map((item, i) => `
    <div class="gantt-item" style="flex: ${item.end - item.start}; background:${colors[i % colors.length]}">
      ${item.name}
      <span class="time-range">[${item.start} - ${item.end}]</span>
    </div>`).join('');

  document.getElementById('ganttChart').innerHTML = ganttHTML;
}

// CPU Scheduling
function simulateCPU() {
  const algo = document.getElementById('cpuAlgorithm').value;
  const names = document.getElementById('processes').value.split(',');
  const arrivals = document.getElementById('arrivals').value.split(',');
  const bursts = document.getElementById('bursts').value.split(',');
  const priorities = document.getElementById('priorities').value.split(',');
  const quantum = parseInt(document.getElementById('quantum').value) || 2;

  let processes = names.map((name, i) => ({
    name: name.trim(), 
    arrival: parseInt(arrivals[i]), 
    burst: parseInt(bursts[i]),
    remaining: parseInt(bursts[i]),
    priority: parseInt(priorities[i] || 0),
    start: -1,
    completion: 0,
    tat: 0,
    wt: 0
  }));

  let time = 0;
  let gantt = [];

  if (algo === 'fcfs') {
    processes.sort((a, b) => a.arrival - b.arrival);
    for (let p of processes) {
      if (time < p.arrival) time = p.arrival;
      p.start = time;
      time += p.burst;
      p.completion = time;
      p.tat = p.completion - p.arrival;
      p.wt = p.tat - p.burst;
      gantt.push({ name: p.name, start: p.start, end: p.completion });
    }
  }
  else if (algo === 'sjf') {
    let ready = [], completed = 0;
    while (completed < processes.length) {
      for (let p of processes) {
        if (p.arrival <= time && p.completion === 0 && !ready.includes(p)) ready.push(p);
      }
      if (ready.length === 0) { time++; continue }
      ready.sort((a, b) => a.burst - b.burst);
      let p = ready.shift();
      p.start = time;
      time += p.burst;
      p.completion = time;
      p.tat = p.completion - p.arrival;
      p.wt = p.tat - p.burst;
      gantt.push({ name: p.name, start: p.start, end: p.completion });
      completed++;
    }
  }
  else if (algo === 'srtf') {
    let completed = 0;
    while (completed < processes.length) {
      let p = processes
        .filter(pro => pro.arrival <= time && pro.remaining > 0)
        .sort((a, b) => a.remaining - b.remaining)[0];
      if (!p) { time++; continue }
      if (p.start === -1) p.start = time;
      p.remaining--;
      gantt.push({ name: p.name, start: time, end: time + 1 });

      time++;
      if (p.remaining === 0) {
        p.completion = time;
        p.tat = p.completion - p.arrival;
        p.wt = p.tat - p.burst;
        completed++;
      }
    }
  }
  else if (algo === 'rr') {
    let queue = [], idx = 0;
    processes.sort((a, b) => a.arrival - b.arrival);
    queue.push(processes[idx]);
    idx++;
    while (queue.length > 0) {
      let p = queue.shift();
      if (p.start === -1) p.start = time;
      let execute = Math.min(quantum, p.remaining);
      gantt.push({ name: p.name, start: time, end: time + execute });
      time += execute;
      p.remaining -= execute;
      for (; idx < processes.length && processes[idx].arrival <= time; idx++) {
        queue.push(processes[idx]);
      }
      if (p.remaining > 0) {
        queue.push(p);
      } else {
        p.completion = time;
        p.tat = p.completion - p.arrival;
        p.wt = p.tat - p.burst;
      }
    }
  }
  else if (algo === 'priority') {
    let completed = 0;
    while (completed < processes.length) {
      let p = processes
        .filter(pro => pro.arrival <= time && pro.completion === 0)
        .sort((a, b) => b.priority - a.priority)[0];
      if (!p) { time++; continue }
      p.start = time;
      time += p.burst;
      p.completion = time;
      p.tat = p.completion - p.arrival;
      p.wt = p.tat - p.burst;
      gantt.push({ name: p.name, start: p.start, end: p.completion });
      completed++;
    }
  }
  
  // Display
  renderGantt(gantt);
  let table = "<table class='table table-bordered'><tr><th>Process</th><th>Arrival</th><th>Burst</th><th>Completion</th><th>TAT</th><th>Waiting</th></tr>";
  let totalTAT = 0, totalWT = 0;
  for (let p of processes) {
    table += `<tr><td>${p.name}</td><td>${p.arrival}</td><td>${p.burst}</td><td>${p.completion}</td><td>${p.tat}</td><td>${p.wt}</td></tr>`;
    totalTAT += p.tat;
    totalWT += p.wt;
  }
  table += `</table>`;
  document.getElementById('cpuTable').innerHTML = table;
  document.getElementById('cpuAverages').innerHTML = `
    <p>Average TAT: ${(totalTAT / processes.length).toFixed(2)}</p>
    <p>Average WT: ${(totalWT / processes.length).toFixed(2)}</p>`;
}

// Disk Scheduling
function simulateDisk() {
  const algo = document.getElementById('diskAlgorithm').value;
  let requests = document.getElementById('diskInput').value.split(',').map(Number);
  let head = parseInt(document.getElementById('headPosition').value);
  let total = 0;

  if (algo === 'fcfs') {
    for (let req of requests) {
      total += Math.abs(req - head);
      head = req;
    }
  }
  // Implement other disk algorithms (SSTF, SCAN, C-SCAN, etc) here if needed

  document.getElementById('diskOutput').innerHTML = `<p>Total seek = ${total}</p>`;
}

// Page Replacement
function simulatePage() {
  const algo = document.getElementById('pageAlgorithm').value;
  let refStr = document.getElementById('pageInput').value.split(',').map(Number);
  let frames = [];

  let pageFaults = 0;
  let output = '';
  let frameSize = parseInt(document.getElementById('frameCount').value);

  for (let i = 0; i < refStr.length; i++) {
    let page = refStr[i];
    if (!frames.includes(page)) {
      pageFaults++;
      if (frames.length < frameSize) {
        frames.push(page);
      } else {
        if (algo === 'fifo') {
          frames.shift();
          frames.push(page);
        }
        else if (algo === 'lru') {
          let idxs = frames.map(f => refStr.lastIndexOf(f, i - 1)); 
          let lruIdx = idxs.indexOf(Math.min(...idxs)); 
          frames[lruIdx] = page;
        }
        else if (algo === 'mru') {
          let idxs = frames.map(f => refStr.lastIndexOf(f, i - 1)); 
          let mruIdx = idxs.indexOf(Math.max(...idxs)); 
          frames[mruIdx] = page;
        }
        else if (algo === 'optimal') {
          let idxs = frames.map(f => {
            let idx = refStr.indexOf(f, i + 1);
            return idx !== -1 ? idx : Infinity;
          });
          let victimIdx = idxs.indexOf(Math.max(...idxs)); 
          frames[victimIdx] = page;
        }
      }
    }
    output += `Step ${i + 1}: [${frames.join(", ")}]<br>`;
  }
  output += `<br>Total page faults: ${pageFaults}`;

  document.getElementById('pageOutput').innerHTML = output;
}

