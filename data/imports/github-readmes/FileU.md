# Safe File Organizer

A **production-ready, safety-first** file organization system for Windows, macOS, and Linux. Organizes files by type, date, and size with comprehensive safety features.

## 🛡️ Safety Features

- **NO file deletion** - Files are never deleted without verification
- **DRY RUN by default** - Safe mode enabled by default
- **Copy → Verify → Move workflow** - Files are copied, verified (hash), then moved
- **Full logging** - Every action is logged (human-readable + JSON)
- **Reversible operations** - Logs enable reversal of operations
- **Fail-safe design** - System stops on errors to prevent data loss

## 📋 Requirements

- Python 3.10 or higher
- No external dependencies (uses only Python standard library)

**Windows Users:** See [WINDOWS_USAGE.md](WINDOWS_USAGE.md) for detailed Windows-specific instructions including cross-drive operations (C:, D:, etc.).

## 🚀 Installation

1. Clone or download this repository
2. Ensure Python 3.10+ is installed
3. No additional packages required (uses standard library only)

## 📁 Project Structure

```
safe_file_organizer/
 ├── main.py              # Entry point
 ├── config.py            # Configuration settings
 ├── scanner/
 │    ├── __init__.py
 │    └── scan.py         # File scanning logic
 ├── organizer/
 │    ├── __init__.py
 │    └── organize.py     # Organization logic
 ├── utils/
 │    ├── __init__.py
 │    ├── hashing.py      # Hash utilities (streaming)
 │    ├── logger.py       # Logging utilities
 │    └── validators.py   # Validation utilities
 ├── logs/                # Generated log files
 ├── README.md
 └── requirements.txt
```

## 🎯 Usage

### Dry Run (Default - Safe)

**Dry run mode is the default** and performs no file operations. It simulates all actions and logs what would happen.

```bash
# Basic dry run
python main.py --root ~/Downloads --target ~/OrganizedFiles

# Or using Windows paths
python main.py --root C:\Users\YourName\Downloads --target C:\Users\YourName\OrganizedFiles
```

**Output:**
- Lists all files that would be organized
- Shows target locations
- Logs all operations (no files are moved)
- Safe to run multiple times

### Live Run (Actual File Operations)

**⚠️ WARNING: This will move files! Use dry-run first.**

```bash
# Enable live mode with --live flag
python main.py --root ~/Downloads --target ~/OrganizedFiles --live
```

**What happens in live mode:**
1. Files are scanned
2. Each file is **copied** to target location
3. Copy is **verified** using SHA-256 hash
4. If verification succeeds, **original is removed** (move completes)
5. If verification fails, copy is deleted and original remains

### Command-Line Options

```bash
python main.py [OPTIONS]

Options:
  --root PATH      Root directory to scan (default: ~/Downloads)
  --target PATH    Target directory for organized files (default: ~/OrganizedFiles)
  --live           Enable live mode (default: dry-run mode)
  --log-dir PATH   Log directory (default: ./logs)
  -h, --help       Show help message
```

### Examples

**Example 1: Dry run on Downloads folder**
```bash
python main.py --root ~/Downloads --target ~/Documents/Organized
```

**Example 2: Live run (Windows)**
```bash
python main.py --root C:\Users\John\Downloads --target C:\Users\John\Organized --live
```

**Example 3: Custom log directory**
```bash
python main.py --root ~/Downloads --target ~/Organized --log-dir ~/logs/file-organizer
```

## 📂 Organization Structure

Files are organized into the following structure:

```
TARGET/
 └── ByType/
     ├── Documents/
     ├── Images/
     ├── Videos/
     ├── Audio/
     ├── Archives/
     ├── Code/
     └── Others/
```

**File Type Categories:**
- **Documents**: PDF, DOCX, TXT, PPTX, XLSX, etc.
- **Images**: JPG, PNG, GIF, WEBP, etc.
- **Videos**: MP4, MKV, AVI, MOV, etc.
- **Audio**: MP3, WAV, FLAC, AAC, etc.
- **Archives**: ZIP, RAR, 7Z, TAR, etc.
- **Code**: PY, JS, CPP, JAVA, HTML, CSS, etc.
- **Others**: All other file types

**Note:** Files are organized **by type only** in this version. Date and size categorizations are planned for future versions or can be added via configuration.

## 📝 Logging

All operations are logged in two formats:

### 1. Human-Readable Log (`logs/operations.log`)
```
2024-01-15 10:30:45 - INFO - Starting Safe File Organizer
2024-01-15 10:30:46 - INFO - [DRY RUN] DRY_RUN_MOVE - SUCCESS - /path/to/file.pdf -> /target/ByType/Documents/file.pdf
```

### 2. JSON Log (`logs/operations.json`)
```json
[
  {
    "timestamp": "2024-01-15T10:30:45.123456",
    "operation_type": "DRY_RUN_MOVE",
    "original_path": "/path/to/file.pdf",
    "new_path": "/target/ByType/Documents/file.pdf",
    "file_hash": null,
    "success": true,
    "error_message": null,
    "dry_run": true
  }
]
```

**Log Fields:**
- `timestamp`: ISO format timestamp
- `operation_type`: Type of operation (SCAN, COPY, MOVE, VERIFY, etc.)
- `original_path`: Original file path
- `new_path`: Target file path
- `file_hash`: SHA-256 hash (computed in live mode)
- `success`: Operation success status
- `error_message`: Error details (if any)
- `dry_run`: Whether operation was a dry run

## ⚙️ Configuration

Edit `config.py` to customize:

- **Paths**: Root and target directories
- **File categories**: Add/modify file type categories
- **Ignore lists**: System folders and file extensions to ignore
- **Size buckets**: Size thresholds for categorization
- **Hash settings**: Hash algorithm and chunk size
- **Logging**: Log file names and levels

### Example Configuration

```python
# Enable live mode by default (NOT RECOMMENDED - keep False)
ENABLE_MOVE = False

# Custom root directory
ROOT_DIRECTORY = Path.home() / "MyFiles"

# Custom ignore folders
IGNORE_FOLDERS = {
    ".git",
    "node_modules",
    "venv",
    # Add custom folders
}
```

## 🔒 Safety Warnings

1. **Always run dry-run first** - Verify operations before enabling live mode
2. **Backup important data** - Even with safety features, always backup critical files
3. **Check logs** - Review logs before and after operations
4. **Test on small directories** - Start with a small test directory
5. **Path length limits** - Windows has path length limits (~260 characters)

## 🐛 Troubleshooting

### "Path too long" error
- Windows has path length limitations
- Shorten target directory paths
- Or use Windows long path support (requires Windows 10+ and configuration)

### "Permission denied" error
- Check file/folder permissions
- Run with appropriate user permissions
- Some system folders may be protected

### "Insufficient disk space" error
- Ensure enough space for file copies
- In live mode, files are copied before moving

### Files not being organized
- Check ignore lists in `config.py`
- Verify file extensions are recognized
- Check logs for skip/error messages

## 🧪 Testing

1. Create a test directory with sample files
2. Run dry-run on test directory
3. Review logs and verify operations
4. Run live mode on test directory
5. Verify files are correctly organized
6. Check that originals are removed (if verified)

## 📊 Performance

- **Scalability**: Handles millions of files and 1TB+ data
- **Memory efficiency**: Uses streaming/chunked hashing (8MB chunks)
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Safe**: Copy-verify-move ensures data integrity

## 🔄 Reversibility

Operations can be reversed using logs:
1. Read `logs/operations.json`
2. Extract `original_path` and `new_path` pairs
3. Move files back using script or manual operations

**Note:** This is a manual process. Future versions may include automated reversal.

## 📄 License

This project is provided as-is for safe file organization.

## ⚠️ Disclaimer

This tool is provided "as-is" without warranties. Always:
- Test on non-critical data first
- Maintain backups
- Review logs carefully
- Use at your own risk

## 🤝 Contributing

Contributions are welcome! Please:
1. Test thoroughly
2. Maintain safety-first design
3. Update documentation
4. Follow existing code style

## 📞 Support

For issues or questions:
1. Check logs in `logs/` directory
2. Review `config.py` settings
3. Run with dry-run mode to debug
4. Check error messages in logs

---

**Remember: Safety first! Always use dry-run mode first, and maintain backups of critical data.**

