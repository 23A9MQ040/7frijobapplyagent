# Interview preparation utilities
from typing import List, Dict

class InterviewPrepEngine:
    """Generate interview preparation materials"""
    
    def __init__(self):
        self.question_categories = {
            'coding': self.get_coding_questions,
            'system_design': self.get_system_design_questions,
            'ai_ml': self.get_ai_ml_questions,
            'behavioral': self.get_behavioral_questions,
        }
    
    def get_coding_questions(self) -> List[Dict]:
        """Generate coding interview questions"""
        return [
            {"question": "Two Sum", "difficulty": "Easy"},
            {"question": "Longest Substring Without Repeating Characters", "difficulty": "Medium"},
            {"question": "Median of Two Sorted Arrays", "difficulty": "Hard"},
        ]
    
    def get_system_design_questions(self) -> List[Dict]:
        """Generate system design questions"""
        return [
            {"question": "Design a Job Search Engine", "difficulty": "Hard"},
            {"question": "Design a Caching System", "difficulty": "Hard"},
            {"question": "Design a Message Queue", "difficulty": "Hard"},
        ]
    
    def get_ai_ml_questions(self) -> List[Dict]:
        """Generate AI/ML interview questions"""
        return [
            {"question": "Explain transformer architecture and attention mechanisms", "difficulty": "Hard"},
            {"question": "How would you optimize model training for GPU memory?", "difficulty": "Hard"},
            {"question": "Explain the differences between supervised and unsupervised learning", "difficulty": "Medium"},
        ]
    
    def get_behavioral_questions(self) -> List[Dict]:
        """Generate behavioral interview questions"""
        return [
            {"question": "Tell me about a challenging project you worked on", "difficulty": "Medium"},
            {"question": "How do you handle failure?", "difficulty": "Medium"},
            {"question": "Describe your ideal work environment", "difficulty": "Easy"},
        ]
    
    def generate_questions(self, job_title: str, **kwargs) -> Dict[str, List[Dict]]:
        """Generate all interview questions for a role"""
        return {
            'coding': self.get_coding_questions(),
            'system_design': self.get_system_design_questions(),
            'ai_ml': self.get_ai_ml_questions(),
            'behavioral': self.get_behavioral_questions(),
        }
    
    def generate_mock_interview(self, job_title: str) -> Dict:
        """Generate a full mock interview structure"""
        # TODO: Integrate with voice/video API for interactive mock interviews
        return {
            'job_title': job_title,
            'duration_minutes': 60,
            'sections': self.generate_questions(job_title),
        }

# Initialize
interview_prep = InterviewPrepEngine()
