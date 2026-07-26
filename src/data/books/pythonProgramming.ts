export const PYTHON_PROGRAMMING_CONTENT = {
  cover: {
    tagline: "Master Python programming from a security-first perspective, tailored for the modern threat landscape.",
    blurb: "Python is the lingua franca of cybersecurity. From automating repetitive tasks to developing sophisticated exploits and AI-driven defense mechanisms, this book provides a comprehensive roadmap for mastering Python. Authored by the Cyberhawk UG team, it combines technical depth with practical, real-world scenarios encountered by security professionals globally."
  },
  toc: [
    "Introduction to Python & The Hacker's Workspace",
    "Core Syntax: Variables, Types, and Operations",
    "Control Flow: Logic and Loops for Automation",
    "Functions: Building Reusable Security Tools",
    "Data Structures: Lists, Tuples, and Dictionaries",
    "Working with Modules and Packages",
    "File I/O: Parsing Logs and Data Extraction",
    "Error Handling and Defensive Programming",
    "Regular Expressions: The Pattern Matching Powerhouse",
    "Networking Basics: Sockets and Protocols",
    "Web Scraping for OSINT",
    "Automating Web Requests with Requests",
    "Security Scripting: Port Scanners and Banner Grabbing",
    "System Administration with Python",
    "Object-Oriented Programming for Security Frameworks",
    "Interacting with APIs (REST, GraphQL)",
    "Database Interaction: SQL and NoSQL",
    "Concurrent Programming: Multi-threading and AsyncIO",
    "Developing Simple Exploits and Proofs of Concept",
    "The Future: AI-Assisted Programming and Automation"
  ],
  chapters: [
    {
      title: "Introduction to Python & The Hacker's Workspace",
      pages: [
        "Python has become the most important language in the cybersecurity industry. Its simplicity, combined with a vast ecosystem of libraries, makes it the perfect tool for both attackers and defenders. Whether you are automating a simple port scan or building an entire threat intelligence platform, Python is almost always the right choice.\n\nSetting up your environment is the first step. For security work, we recommend a clean Linux environment (like Kali or Parrot) or a well-configured WSL2 instance on Windows. Using virtual environments (`venv`) is critical to avoid dependency hell, especially when working with specialized security libraries that might conflict with system-level packages.",
        "A typical hacker's workspace structure might look like this:\n\n```text\n/project-root\n├── venv/             # Python Virtual Environment\n├── src/\n│   ├── __init__.py\n│   ├── scanner.py    # Main scanning logic\n│   └── utils.py      # Helper functions (hashing, etc.)\n├── tests/            # Unit tests for tools\n├── requirements.txt  # Project dependencies\n└── .env              # Sensitive API keys (ignored by git)\n```\n\nWe emphasize readability and maintainability—key traits for any script that might be used in a high-pressure incident response scenario.",
        "Diagram: The Hacker's Workspace Setup\n```\n[ Host OS ] <---> [ Virtual Environment ] <---> [ Security Libraries ]\n      |                   |                         (Scapy, Requests)\n      |                   |__ [ Project Code ]\n      |__ [ Git Repo ]\n```\n\nIn this chapter, we also cover the basics of the Python interpreter, the 'Zen of Python', and how to write your first scripts."
      ]
    },
    {
      title: "Core Syntax: Variables, Types, and Operations",
      pages: [
        "Understanding how Python handles data is fundamental. Python is dynamically typed, but being aware of types is crucial for security scripts. Integers, floats, strings, and booleans form the bedrock.\n\nIn security, strings are everywhere. Mastering string manipulation allows you to craft payloads or extract data points efficiently.\n\n```python\n# String manipulation for payload crafting\nbase_payload = \"A\" * 64\nreturn_address = \"\\xef\\xbe\\xad\\xde\" # 0xDEADBEEF\nfull_payload = f\"{base_payload}{return_address}\"\n\nprint(f\"Payload Length: {len(full_payload)}\")\nprint(f\"Hex Representation: {full_payload.encode().hex()}\")\n```",
        "We also introduce type hinting. While Python doesn't enforce it at runtime, using type hints makes your security tools more robust.\n\n```python\ndef send_payload(target: str, port: int) -> bool:\n    \"\"\"Sends a payload to a target and returns success status.\"\"\"\n    print(f\"[+] Sending payload to {target}:{port}\")\n    # Logic here...\n    return True\n```\n\nA well-typed function signature immediately communicates intent and reduces common programming errors.",
        "Diagram: Type Conversion Flow\n```\n[ String: \"80\" ] --(int())--> [ Integer: 80 ] --(hex())--> [ String: \"0x50\" ]\n       ^                                                       |\n       |_______________________(str())_________________________|\n```"
      ]
    },
    {
      title: "Control Flow: Logic and Loops for Automation",
      pages: [
        "Logic is the brain of your scripts. `if`, `elif`, and `else` statements allow your tools to make decisions. Boolean logic is essential for constructing complex conditions in vulnerability scanners.\n\n```python\n# Example version checking logic\nservice_version = \"Apache/2.4.49\"\n\nif \"2.4.49\" in service_version or \"2.4.50\" in service_version:\n    print(\"[!] Warning: Service might be vulnerable to Path Traversal (CVE-2021-41773)!\")\nelif \"2.4\" in service_version:\n    print(\"[*] Service is Apache 2.4.x, check for specific sub-version vulnerabilities.\")\nelse:\n    print(\"[-] Service version seems stable.\")\n```",
        "Loops are the workhorses of automation. `for` loops allow you to iterate over targets, while `while` loops are perfect for listening for incoming connections.\n\n```python\n# Iterating over a list of common ports\ncommon_ports = [21, 22, 80, 443, 8080]\ntarget_ip = \"192.168.1.1\"\n\nfor port in common_ports:\n    # Imagine a function check_port(ip, port)\n    print(f\"[*] Checking {target_ip}:{port}...\")\n```\n\nUnderstanding how to use `break` and `continue` allows for fine-grained control over your automation logic."
      ]
    },
    {
      title: "Functions: Building Reusable Security Tools",
      pages: [
        "Functions allow you to wrap logic into reusable blocks. In security, modularity is key. Build a library of functions for common tasks: hashing, formatting packets, or interacting with APIs.\n\n```python\nimport hashlib\n\ndef generate_sha256(data: str) -> str:\n    \"\"\"Calculates the SHA-256 hash of a string.\"\"\"\n    hasher = hashlib.sha256()\n    hasher.update(data.encode('utf-8'))\n    return hasher.hexdigest()\n\nprint(f\"Hash: {generate_sha256('secret_password')}\")\n```",
        "We explore positional and keyword arguments, default values, and docstrings. A well-documented function is an auditable function.\n\nDiagram: Security Function Workflow\n```\n[ Input Data ] ---> [ Function Logic ] ---> [ Security Output ]\n(e.g., Raw Log)     (Regex Parsing)          (Alert Trigger)\n        ^                  |                        |\n        |____[ Error Handling ]_____________________|\n```"
      ]
    },
    {
      title: "Data Structures: Lists, Tuples, and Dictionaries",
      pages: [
        "Efficiently managing data distinguishes a script from a professional tool. Dictionaries are perfect for storing configuration or mapping service names to ports.\n\n```python\n# Port mapping dictionary\nservices = {\n    80: \"HTTP\",\n    443: \"HTTPS\",\n    22: \"SSH\",\n    3306: \"MySQL\"\n}\n\ndef identify_service(port: int) -> str:\n    return services.get(port, \"Unknown Service\")\n\nprint(f\"Port 443 is {identify_service(443)}\")\n```",
        "Lists are perfect for ordered collections, like a list of target subdomains. Tuples, being immutable, are ideal for data that shouldn't change.\n\n```python\n# List comprehension for filtering open ports\nall_scanned = [(80, \"Open\"), (443, \"Open\"), (22, \"Closed\")]\nopen_ports = [port for port, status in all_scanned if status == \"Open\"]\n\nprint(f\"Open ports found: {open_ports}\")\n```",
        "Diagram: Dictionary Mapping\n```\nKey (Port)  --->  Value (Service)\n   [ 80 ]   --->   [ \"HTTP\" ]\n   [ 22 ]   --->   [ \"SSH\"  ]\n   [ 443]   --->   [ \"HTTPS\"]\n```"
      ]
    },
    {
      title: "Working with Modules and Packages",
      pages: [
        "Python's strength lies in its modules. The standard library includes `os`, `sys`, and `hashlib`. Learning how to use these effectively is the first step toward building powerful tools.\n\n```python\nimport sys\nimport os\n\n# Check if running with root privileges\nif os.getuid() != 0:\n    print(\"[!] This script must be run as root/sudo!\")\n    sys.exit(1)\n\nprint(f\"[*] Platform: {sys.platform}\")\nprint(f\"[*] Current Directory: {os.getcwd()}\")\n```",
        "In the security world, we often rely on specialized packages like `Scapy` for packet manipulation. Understanding how to structure your own code into modules and packages makes your projects scalable.\n\nDiagram: Module Import Hierarchy\n```\n[ Main Script ]\n       |\n       |---- [ Built-in: sys, os ]\n       |---- [ Custom: utils.py ]\n       |---- [ Third-party: scapy, requests ]\n```"
      ]
    },
    {
      title: "File I/O: Parsing Logs and Data Extraction",
      pages: [
        "Security work involves a lot of data, much of it stored in files. Reading from and writing to files is a core skill. Whether you're parsing logs or saving scan results, Python makes it easy.\n\n```python\n# Parsing a log for 404 errors\nwith open(\"access.log\", \"r\") as log_file:\n    for line in log_file:\n        if \" 404 \" in line:\n            print(f\"[!] Found 404 error: {line.strip()}\")\n```",
        "We cover the `with` statement for safe operations. We also look at working with structured formats like JSON.\n\n```python\nimport json\n\nscan_results = {\"target\": \"192.168.1.1\", \"open_ports\": [80, 443]}\nwith open(\"results.json\", \"w\") as f:\n    json.dump(scan_results, f, indent=4)\n```",
        "Diagram: Log Extraction Process\n```\n[ Raw File ] ---> [ Python Script ] ---> [ Filtered Data ]\n(Gigabytes)       (Line by Line)        (Security Events)\n```"
      ]
    },
    {
      title: "Error Handling and Defensive Programming",
      pages: [
        "A script that crashes is a liability. Defensive programming involves anticipating where things might go wrong. `try-except` blocks allow you to build resilient tools.\n\n```python\nimport socket\n\ntry:\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.settimeout(2)\n    s.connect((\"192.168.1.50\", 80))\n    print(\"[+] Connection successful!\")\nexcept socket.timeout:\n    print(\"[-] Connection timed out.\")\nexcept ConnectionRefusedError:\n    print(\"[-] Connection refused.\")\nfinally:\n    s.close()\n```",
        "Using Python's `logging` module allows you to record script execution, providing an audit trail essential for debugging and reporting.\n\nDiagram: Exception Handling Flow\n```\n[ Risky Action ] ----(Success)----> [ Continue ]\n       |                                |\n    (Error)                             |\n       |                                |\n[ Except Block ] ---> [ Log & Recover ]--|\n```"
      ]
    },
    {
      title: "Regular Expressions: The Pattern Matching Powerhouse",
      pages: [
        "Regular expressions (regex) are indispensable for security professionals. They allow you to search for complex patterns like IP addresses or exploit signatures.\n\n```python\nimport re\n\nlog_entry = \"Connection from 192.168.1.105 on port 443\"\nip_pattern = r\"\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\"\n\nmatch = re.search(ip_pattern, log_entry)\nif match:\n    print(f\"[+] Found IP: {match.group()}\")\n```",
        "We dive into character classes, quantifiers, and grouping. Practical examples include identifying potential SQL injection attempts by looking for specific keywords and symbols.\n\nDiagram: Regex Pattern Components\n```\nPattern: \\d{1,3}\\.   (Matches 1-3 digits followed by a dot)\n          ^     ^\n          |     |__ Escaped Metacharacter\n          |__ Quantifier\n```"
      ]
    },
    {
      title: "Networking Basics: Sockets and Protocols",
      pages: [
        "The `socket` module is the key to building network tools. We start with the basics of TCP and UDP communication, building simple clients and servers from scratch.\n\n```python\n# Simple TCP Client snippet\nimport socket\n\ndef tcp_client(host: str, port: int):\n    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    client.connect((host, port))\n    client.send(b\"HEAD / HTTP/1.1\\r\\nHost: example.com\\r\\n\\r\\n\")\n    response = client.recv(4096)\n    print(response.decode())\n    client.close()\n```",
        "Understanding how to send and receive raw data allows you to interact with services that don't have a high-level library.\n\nDiagram: TCP Three-way Handshake\n```\n[ Client ] ----(SYN)-----> [ Server ]\n[ Client ] <---(SYN/ACK)--- [ Server ]\n[ Client ] ----(ACK)-----> [ Server ]\n```\n\nThis is the foundation for building custom scanners and banner grabbers."
      ]
    },
    {
      title: "Web Scraping for OSINT",
      pages: [
        "Open-Source Intelligence (OSINT) often involves gathering data from the web. Web scraping allows you to automate this process. Using libraries like `BeautifulSoup`, you can extract information from HTML pages.\n\n```python\nfrom bs4 import BeautifulSoup\nimport requests\n\ndef get_page_title(url: str):\n    response = requests.get(url)\n    soup = BeautifulSoup(response.text, 'html.parser')\n    return soup.title.string\n\nprint(f\"Target Title: {get_page_title('https://example.com')}\")\n```",
        "We discuss the ethics and techniques for handling anti-scraping measures. Scraping can be used to monitor forums for leaked credentials or to build a profile of a target's infrastructure.\n\nDiagram: Web Scraping Workflow\n```\n[ URL List ] ---> [ Requests ] ---> [ HTML ] ---> [ BS4 Parsing ] ---> [ OSINT Data ]\n```"
      ]
    },
    {
      title: "Automating Web Requests with Requests",
      pages: [
        "The `requests` library is the gold standard for HTTP in Python. It simplifies sending GET, POST, and other methods, handling headers and cookies with ease.\n\n```python\nimport requests\n\nurl = \"http://192.168.1.10/login\"\nheaders = {\"User-Agent\": \"SecurityScanner/1.0\"}\ndata = {\"username\": \"admin\", \"password\": \"12345\"}\n\nresponse = requests.post(url, headers=headers, data=data)\nif \"Login failed\" not in response.text:\n    print(\"[+] Potential successful login!\")\n```",
        "We look at how to automate tasks like brute-forcing login forms and testing for IDOR vulnerabilities. We also cover routing traffic through a proxy like Burp Suite.\n\nDiagram: HTTP Request/Response Cycle\n```\n[ Script ] ----(POST + Data)----> [ Web Server ]\n[ Script ] <---(200 OK + HTML)--- [ Web Server ]\n```"
      ]
    },
    {
      title: "Security Scripting: Port Scanners and Banner Grabbing",
      pages: [
        "A port scanner is a classic project. We start with a simple, single-threaded scanner to understand the underlying mechanics.\n\n```python\nimport socket\n\ndef port_scan(target: str, port: int):\n    try:\n        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        s.settimeout(1)\n        result = s.connect_ex((target, port))\n        if result == 0:\n            print(f\"[+] Port {port} is open\")\n        s.close()\n    except Exception as e:\n        pass\n\n# Scanning common ports\nfor p in [22, 80, 443]:\n    port_scan(\"192.168.1.1\", p)\n```",
        "Banner grabbing involves reading the initial response from the service. This often reveals the software version, critical for vulnerability research.\n\nDiagram: Port Scanning Sequence\n```\n[ Scanner ] --(Port 80)--> [ Open ]   --> [ Log Open ]\n[ Scanner ] --(Port 81)--> [ Closed ] --> [ Ignore ]\n[ Scanner ] --(Port 22)--> [ Open ]   --> [ Grab Banner ]\n```"
      ]
    },
    {
      title: "System Administration with Python",
      pages: [
        "Python is excellent for automating system-level tasks. Using modules like `os` and `subprocess`, you can manage files and execute shell commands.\n\n```python\nimport os\nimport stat\n\ndef check_permissions(filepath: str):\n    st = os.stat(filepath)\n    mode = st.st_mode\n    if bool(mode & stat.S_IWOTH):\n        print(f\"[!] Warning: {filepath} is world-writable!\")\n\ncheck_permissions(\"/etc/passwd\")\n```",
        "We explore how to write scripts that audit user accounts or automate security patches. Automating these routine tasks reduces human error.\n\nDiagram: System Audit Flow\n```\n[ Start ] ---> [ List Files ] ---> [ Check Perms ] ---> [ Log Vulnerable ]\n                 ^                     |\n                 |_____________________|\n```"
      ]
    },
    {
      title: "Object-Oriented Programming for Security Frameworks",
      pages: [
        "As projects grow, Object-Oriented Programming (OOP) helps you stay organized. By using classes, you can model security concepts naturally.\n\n```python\nclass Target:\n    def __init__(self, ip: str):\n        self.ip = ip\n        self.open_ports = []\n\n    def add_port(self, port: int):\n        self.open_ports.append(port)\n\n    def report(self):\n        print(f\"Report for {self.ip}: {self.open_ports}\")\n\nmy_target = Target(\"10.0.0.1\")\nmy_target.add_port(80)\nmy_target.report()\n```",
        "OOP enables features like inheritance and polymorphism, perfect for building extensible security frameworks.\n\nDiagram: Class Inheritance\n```\n    [ BaseTool ]\n     /      \\\n[ Scanner ] [ Exploiter ]\n    |           |\n[ TCPScan ] [ BufferOverflow ]\n```"
      ]
    },
    {
      title: "Interacting with APIs (REST, GraphQL)",
      pages: [
        "Modern security tools rely on external data. Many services—like Shodan or VirusTotal—provide APIs. Learning to interact with these allows you to automate threat intelligence workflows.\n\n```python\nimport requests\n\nSHODAN_API_KEY = \"YOUR_KEY_HERE\"\n\ndef shodan_search(query: str):\n    url = f\"https://api.shodan.io/shodan/host/search?key={SHODAN_API_KEY}&query={query}\"\n    response = requests.get(url)\n    return response.json()\n\n# Search for vulnerable Apache servers\nresults = shodan_search(\"Apache 2.4.49\")\nprint(f\"Found {results['total']} potential targets\")\n```",
        "We cover RESTful APIs and GraphQL. You'll learn how to handle keys securely and parse JSON responses.\n\nDiagram: API Request with Auth\n```\n[ Client Script ] --(API Key + Query)--> [ Shodan API ]\n[ Client Script ] <---(JSON Data)-------- [ Shodan API ]\n```"
      ]
    },
    {
      title: "Database Interaction: SQL and NoSQL",
      pages: [
        "Managing security data requires a database. Python's `sqlite3` provides a lightweight way to store data locally.\n\n```python\nimport sqlite3\n\nconn = sqlite3.connect('security_scans.db')\nc = conn.cursor()\nc.execute('''CREATE TABLE IF NOT EXISTS hosts (ip text, status text)''')\n\n# Parameterized query to prevent SQLi\ntarget_data = (\"192.168.1.1\", \"Up\")\nc.execute(\"INSERT INTO hosts VALUES (?, ?)\", target_data)\nconn.commit()\nconn.close()\n```",
        "From a security perspective, we emphasize parameterized queries to prevent SQL injection in your own tools.\n\nDiagram: SQL Injection Prevention\n```\n[ User Input ] ---> [ Parameterized Query ] ---> [ Database ]\n(\"' OR 1=1\")        (Input Treated as Data)       (Safe Execution)\n```"
      ]
    },
    {
      title: "Concurrent Programming: Multi-threading and AsyncIO",
      pages: [
        "Speed is critical. running tasks in parallel can save hours of time. We introduce `threading` for concurrent execution.\n\n```python\nimport threading\nimport socket\n\ndef scan_port(ip, port):\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.settimeout(1)\n    if s.connect_ex((ip, port)) == 0:\n        print(f\"Port {port} is open\")\n    s.close()\n\ntarget = \"192.168.1.1\"\nfor p in range(20, 30):\n    t = threading.Thread(target=scan_port, args=(target, p))\n    t.start()\n```",
        "We also dive into `asyncio` for I/O-bound tasks where your script spends time waiting for responses.\n\nDiagram: Serial vs. Parallel Execution\n```\nSerial:   [Task 1]-->[Task 2]-->[Task 3]\n\nParallel: [Task 1]\n          [Task 2]\n          [Task 3]\n```"
      ]
    },
    {
      title: "Developing Simple Exploits and Proofs of Concept",
      pages: [
        "Understanding exploits is a core skill. We use Python to develop simple PoC scripts to verify defenses.\n\n```python\n# Proof-of-Concept Skeleton\nimport sys\nimport socket\n\ndef exploit(target, port):\n    # Crafting a malicious buffer\n    buffer = b\"A\" * 1024\n    buffer += b\"\\x42\" * 4 # EIP Overwrite\n\n    print(f\"[*] Sending {len(buffer)} bytes of evil...\")\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.connect((target, port))\n    s.send(buffer)\n    s.close()\n```",
        "This chapter introduces `pwntools` and emphasizes responsible disclosure and ethical use of these skills.\n\nDiagram: Exploit Flow\n```\n[ Attacker ] --(Exploit)--> [ Vulnerable Service ]\n      ^                          |\n      |________(Shell Access)____|\n```"
      ]
    },
    {
      title: "The Future: AI-Assisted Programming and Automation",
      pages: [
        "The landscape is changing with AI. We explore how LLMs can assist in writing security scripts and auditing code.\n\n```python\n# Pseudo-code for AI code auditor\nimport openai\n\ndef audit_code(code_snippet):\n    prompt = f\"Analyze the following Python code for security flaws:\\n{code_snippet}\"\n    response = openai.ChatCompletion.create(\n        model=\"gpt-4\",\n        messages=[{\"role\": \"user\", \"content\": prompt}]\n    )\n    return response.choices[0].message.content\n```",
        "We discuss Python's role in AI security and building AI-powered security agents.\n\nDiagram: AI Security Feedback Loop\n```\n[ Code ] ---> [ AI Auditor ] ---> [ Vulnerability Report ]\n  ^                                     |\n  |___________[ Auto-Remediation ]______|\n```"
      ]
    }
  ]
};
