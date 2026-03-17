# 📚 Note Master - JSON Content Architecture

Complete documentation for the data-driven Note Master learning system.

---

## 🏗️ **Architecture Overview**

Note Master uses a **JSON-based content system** where all lessons, practices, reviews, and challenges are stored as structured data files. This separates content from code, making it easy to add and modify learning materials without touching the application logic.

### **Benefits:**
- ✅ Content independent from code
- ✅ Non-coders can edit JSON files
- ✅ Easy to add new lessons
- ✅ Version control friendly
- ✅ Reusable across skills

---

## 📂 **File Structure**

```
brio/data/content/note-master/
├── skill.json                    ← Skill metadata & structure
├── lessons/                      ← 15 core + 10 bonus lessons
│   ├── L01-why-notes-work.json
│   ├── L02-listen-for-what-matters.json
│   ├── L03-keywords-vs-filler.json
│   ├── L04-short-notes-win.json
│   ├── L05-bullet-power.json
│   ├── L06-number-when-steps.json
│   ├── L07-group-similar-stuff.json
│   ├── L08-headings-help.json
│   ├── L09-symbols-save-time.json
│   ├── L10-boxes-and-circles.json
│   ├── L11-main-idea-vs-details.json
│   ├── L12-turn-notes-to-questions.json
│   ├── L13-notes-as-study-tool.json
│   ├── L14-notes-from-video.json
│   └── L15-notes-from-talk.json
├── practice/                     ← 30 core + 60 bonus activities
│   ├── P01A.json
│   ├── P01B.json
│   ├── P02A.json
│   └── ...
├── reviews/                      ← 10 core + 10 bonus reviews
│   ├── R01-foundation.json
│   ├── R02-writing.json
│   ├── R03-visual.json
│   ├── R04-understanding.json
│   └── R05-reallife.json
└── challenges/                   ← 5 core + 10 bonus challenges
    ├── C01-video-notes.json
    ├── C02-class-notes.json
    ├── C03-study.json
    ├── C04-instructions.json
    └── C05-your-style.json
```

---

## 📋 **Content Structure**

### **1. Skill Metadata (skill.json)**

Defines the overall skill structure, blocks, progression, and XP rewards.

```json
{
  "skillId": "note-master",
  "skillName": "Note Master",
  "skillIcon": "✍️",
  "skillTagline": "Learn faster",
  
  "progression": {
    "core": {
      "id": "core-60",
      "name": "Core Path",
      "totalInteractions": 60,
      "lessons": 15,
      "practices": 30,
      "reviews": 10,
      "challenges": 5
    },
    "bonus": {
      "id": "bonus-90",
      "name": "Master Level",
      "totalInteractions": 90,
      "unlocksAfter": "core-60"
    }
  },

  "blocks": [
    {
      "id": "foundation",
      "name": "Foundation Block",
      "lessons": ["L01", "L02", "L03"]
    }
  ]
}
```

**Key Fields:**
- `progression` - Core 60 + Bonus 90 structure
- `blocks` - Groups lessons by theme
- `lessonMap` - Maps IDs to file slugs
- `xpStructure` - Rewards for each activity type

---

### **2. Lesson Files (lessons/Lxx-name.json)**

Each lesson contains a flow of steps with different interaction types.

```json
{
  "lessonId": "L01",
  "slug": "why-notes-work",
  "block": "foundation",
  "order": 1,
  
  "metadata": {
    "title": "Why Notes Work",
    "subtitle": "Memory demo",
    "icon": "🧠",
    "duration": "2 min",
    "xpReward": 20
  },

  "flow": [
    {
      "stepId": "intro",
      "type": "step-card",
      "content": {
        "icon": "🧠",
        "title": "Why Notes Work",
        "text": "Let's see how notes help you remember",
        "audio": "Try this quick experiment"
      }
    },
    {
      "stepId": "demo",
      "type": "memory-demo",
      "content": { ... }
    }
  ],

  "practiceActivities": [
    {
      "practiceId": "P01A",
      "title": "Memory Game",
      "xpReward": 10,
      "contentRef": "practice/P01A.json"
    }
  ],

  "nextLesson": "L02"
}
```

**Flow Types:**
- `step-card` - Standard content card
- `memory-demo` - Memory test activity
- `tap-keywords` - Keyword selection
- `audio-highlight` - Listen and identify
- `shorten-sentence` - Text compression
- `choose-shortest` - Multiple choice

---

### **3. Practice Files (practice/Pxx.json)**

Practice activities reinforce lesson concepts.

```json
{
  "practiceId": "P01B",
  "lessonId": "L01",
  "title": "When to Take Notes",
  "type": "scenario-choice",
  "xpReward": 10,
  
  "metadata": {
    "icon": "🤔",
    "duration": "1 min",
    "difficulty": "easy"
  },

  "instructions": {
    "text": "Tap the tasks that need notes",
    "audio": "Which tasks need notes?"
  },

  "scenarios": [
    {
      "id": "scenario-1",
      "text": "Shopping for 12 grocery items",
      "emoji": "🛒",
      "needsNotes": true,
      "explanation": "Yes! Hard to remember 12 items"
    }
  ],

  "feedback": {
    "perfect": {
      "message": "Perfect! 🎯",
      "audio": "Great job!"
    }
  }
}
```

**Practice Types:**
- `scenario-choice` - Pick correct situations
- `audio-tap-keywords` - Listen and select
- `shorten-sentences` - Text compression drill
- `drag-drop` - Organize content
- `choose-best-note` - Compare options

---

### **4. Review Files (reviews/Rxx.json)**

Block reviews test retention across multiple lessons.

```json
{
  "reviewId": "R01",
  "title": "Foundation Review",
  "block": "foundation",
  "icon": "🎯",
  
  "metadata": {
    "type": "block-review",
    "unlocksAfter": ["L01", "L02", "L03"],
    "duration": "3 min",
    "xpReward": 15,
    "totalQuestions": 5
  },

  "questions": [
    {
      "id": "q1",
      "type": "memory-recall",
      "fromLesson": "L01",
      "content": { ... }
    }
  ],

  "scoring": {
    "perfect": {
      "min": 5,
      "max": 5,
      "message": "Perfect! Foundation mastered! 🏆",
      "badge": "foundation-master"
    }
  }
}
```

---

### **5. Challenge Files (challenges/Cxx.json)**

Real-world skill validation challenges.

```json
{
  "challengeId": "C01",
  "title": "Video Notes Challenge",
  "icon": "🎥",
  
  "metadata": {
    "type": "real-world-challenge",
    "unlocksAfter": "core-60",
    "duration": "5 min",
    "xpReward": 50,
    "badgeReward": "video-note-master"
  },

  "video": {
    "id": "solar-system",
    "title": "How the Solar System Formed",
    "duration": 120,
    "url": "assets/videos/solar-system.mp4"
  },

  "evaluation": {
    "type": "criteria-checklist",
    "criteria": [
      {
        "id": "main-idea",
        "label": "Captured main idea",
        "points": 10
      }
    ],
    "passingScore": 30
  }
}
```

---

## 🔧 **How It Works**

### **Content Loading Flow:**

```
1. User opens Note Master skill
   ↓
2. ContentLoader.loadSkill('note-master')
   → Fetches skill.json
   ↓
3. Displays 15 lessons organized by block
   ↓
4. User taps "Why Notes Work" (L01)
   ↓
5. ContentLoader.loadLesson('note-master', 'L01-why-notes-work')
   → Fetches L01-why-notes-work.json
   ↓
6. LessonRenderer.render(lessonData)
   → Renders each step in flow sequentially
   ↓
7. User completes lesson
   → Awards 20 XP
   ↓
8. Shows practice options (P01A, P01B)
   ↓
9. User taps practice
   ↓
10. ContentLoader.loadPractice('note-master', 'P01A')
    → Fetches P01A.json
    ↓
11. Renders practice activity
```

---

## 📊 **Core 60 + Bonus 90 Structure**

### **Core Path (60 interactions)**
- 15 lessons × 2 min = 30 min
- 30 practices (2 per lesson) = 60 min
- 10 reviews (5 block + 5 weekly) = 20 min
- 5 challenges = 15 min
**Total: 2 hours**

### **Bonus Track (90 interactions)**
- 10 advanced lessons
- 60 advanced practices (6 per lesson)
- 10 advanced reviews
- 10 master challenges
**Total: 3 hours**

---

## ✅ **Completion Criteria**

### **Lesson Complete:**
- View all steps in flow
- Award: 20 XP

### **Practice Complete:**
- Complete activity
- Award: 10 XP

### **Review Complete:**
- Score 60% or higher
- Award: 15 XP

### **Challenge Complete:**
- Score 60% or higher
- Award: 50 XP + Badge

### **Core Path Complete:**
- All 15 lessons
- All 30 practices
- All 10 reviews
- All 5 challenges
**Total: 60/60 interactions**
**Unlocks: Bonus Track**

---

## 🎮 **Unlock Rules**

### **Sequential Unlock:**
- Lessons unlock one at a time
- Must complete L01 before L02
- Must complete L02 before L03

### **Practice Unlock:**
- Unlocks with parent lesson
- P01A, P01B unlock when L01 complete

### **Review Unlock:**
- Foundation Review unlocks after L01, L02, L03
- Writing Review unlocks after L04-L07
- Etc.

### **Challenge Unlock:**
- All 5 challenges unlock after Core 60 complete

### **Bonus Unlock:**
- Entire Bonus Track (90 interactions) unlocks after Core 60

---

## 💾 **Adding New Content**

### **To Add a New Lesson:**

1. Create lesson file:
```bash
data/content/note-master/lessons/L16-advanced-topic.json
```

2. Follow lesson structure:
```json
{
  "lessonId": "L16",
  "slug": "advanced-topic",
  "block": "bonus",
  "metadata": { ... },
  "flow": [ ... ]
}
```

3. Update skill.json:
```json
{
  "lessonMap": {
    "L16": "advanced-topic"
  }
}
```

4. Create practice files:
```bash
data/content/note-master/practice/P16A.json
data/content/note-master/practice/P16B.json
```

**Done!** No code changes needed.

---

## 🎨 **Content Types Reference**

### **Step Types:**
- `step-card` - Text, icon, sections
- `memory-demo` - Memorization test
- `tap-keywords` - Word selection
- `audio-highlight` - Audio + text matching
- `shorten-sentence` - Text compression
- `choose-shortest` - Multiple choice
- `comparison-card` - Before/after comparison
- `recall-test` - Memory quiz
- `drag-drop` - Organize items

### **Section Types (within step-card):**
- `text` - Paragraph
- `example` - Code/demo box
- `tip` - Callout box
- `list` - Bullet list
- `numbered-list` - Numbered list
- `comparison` - Side-by-side

---

## 🚀 **Performance**

### **Caching:**
- ContentLoader caches all loaded JSON
- First load: HTTP request
- Subsequent: Instant (from cache)

### **Preloading:**
- Skill metadata preloaded on app start
- First lesson (L01) preloaded
- Other lessons loaded on-demand

### **File Sizes:**
- skill.json: ~5KB
- Lesson file: ~3-5KB
- Practice file: ~2KB
- Review file: ~4KB
- Challenge file: ~3KB

**Total for Note Master:** ~200KB (all content)

---

## 📖 **Example: Complete L01**

See `lessons/L01-why-notes-work.json` for full example with:
- 7-step flow
- Memory demo (without notes)
- Memory demo (with notes)
- Comparison reveal
- Takeaway card
- 2 practice activities

---

**🎉 This JSON architecture scales to all Brio skills!**

Use this same structure for:
- Reading Master
- Money Master
- Writing Master
- Any future skill

Just create a new folder: `data/content/skill-name/`
