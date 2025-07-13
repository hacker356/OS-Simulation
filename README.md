# OS-Simulation
# 🖥️ OS Simulator

An interactive web-based application to simulate core Operating System algorithms including **CPU Scheduling**, **Disk Scheduling**, and **Page Replacement** strategies. Designed for educational purposes, this simulator allows users to input custom data and visualize results through Gantt charts, tables, and statistics.

---

## 🚀 Features

### ✅ CPU Scheduling
- **Algorithms Supported:**
  - First Come First Serve (FCFS)
  - Shortest Job First (SJF)
  - Shortest Remaining Time First (SRTF)
  - Round Robin (RR)
  - Priority Scheduling (Higher number = Higher priority)

- **Inputs:**
  - Process ID, Arrival Time, Burst Time, Priority, Time Quantum

- **Outputs:**
  - Gantt Chart
  - Completion, Turnaround, Waiting Times
  - Average Turnaround Time (TAT)
  - Average Waiting Time

---

### 💽 Disk Scheduling
- **Algorithms Supported:**
  - First Come First Serve (FCFS)
  - Shortest Seek Time First (SSTF)
  - SCAN, C-SCAN, LOOK, C-LOOK (Optional)

- **Inputs:**
  - Sequence of disk requests
  - Initial head position

- **Outputs:**
  - Total head movement (Seek Time)

---

### 📄 Page Replacement
- **Algorithms Supported:**
  - FIFO (First In First Out)
  - Optimal
  - LRU (Least Recently Used)
  - MRU (Most Recently Used)

- **Inputs:**
  - Page reference string
  - Number of frames

- **Outputs:**
  - Page faults count
  - Frame-by-frame status at each step

---

## 🎯 Objectives

- Understand the impact of different CPU scheduling algorithms on system performance.
- Visualize disk head movement for various disk scheduling strategies.
- Evaluate page fault behavior across page replacement algorithms.

---

## 🧩 User Interface

The application UI is divided into 3 primary tabs:

### 🔹 CPU Scheduling
- Choose algorithm
- Input process details
- View Gantt chart and metrics

### 🔹 Disk Scheduling
- Choose algorithm
- Input disk request sequence
- View total head movement

### 🔹 Page Replacement
- Choose algorithm
- Input reference string and frame count
- View step-by-step frame allocation and page faults

---

## 🖼️ Screenshot

> *(Insert screenshots here showing UI of CPU scheduling, disk scheduling, and page replacement tabs with sample outputs.)*

---

## ✅ Conclusion

This simulator clearly demonstrates the behavior of key operating system algorithms in a graphical and interactive manner.

### Key Learnings:
- Effects of scheduling on TAT and waiting time
- Disk head optimization strategies
- Page replacement performance and faults

---

## 🔮 Future Scope

- Add support for:
  - File allocation methods (Contiguous, Linked, Indexed)
  - Deadlock detection and avoidance
  - Multithreading and synchronization (Semaphore, Mutex)

- Enhanced UI/UX:
  - Color-coded charts
  - Graphical animations
  - Tooltips and explanations

- Host the application online for widespread educational access.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript / React
- **Backend (Optional):** Node.js (if data persistence is needed)
- **Visualization:** Chart.js / Custom Canvas Gantt charts

---

## 📚 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- Inspired by real-world OS problems and academic use-cases.
- Ideal for BCA, MCA, B.Tech CS/IT students.

---

