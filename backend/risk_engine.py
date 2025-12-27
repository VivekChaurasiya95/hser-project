from typing import Dict, List

class RiskCalculationEngine:
    """Engine for calculating skill extinction risk metrics"""
    
    def __init__(self):
        self.base_half_life = 5  # Base years for half-life calculation
    
    def calculate_rfs(self, automation: float, tool_growth: float, adoption: float) -> float:
        """Calculate Replacement Force Score"""
        return (automation + tool_growth + adoption) / 3
    
    def calculate_ps(self, creativity: float) -> float:
        """Calculate Protection Score"""
        return creativity
    
    def calculate_extinction_risk(self, rfs: float, ps: float) -> float:
        """Calculate Extinction Risk percentage"""
        return rfs * (1 - ps) * 100
    
    def calculate_half_life(self, tool_growth: float) -> float:
        """Calculate Skill Half-Life in years"""
        if tool_growth == 0:
            return 10  # Default max
        return self.base_half_life / tool_growth
    
    def determine_risk_level(self, extinction_risk: float) -> str:
        """Determine risk level category"""
        if extinction_risk >= 70:
            return "critical"
        elif extinction_risk >= 50:
            return "high"
        elif extinction_risk >= 30:
            return "medium"
        else:
            return "low"
    
    def generate_explanation(self, skill: Dict, metrics: Dict) -> Dict:
        """Generate human-readable explanation"""
        reasons = []
        
        # Analyze factors
        if skill['automation'] > 0.7:
            reasons.append("high automation capability")
        if skill['toolGrowth'] > 0.8:
            reasons.append("rapid AI tool development")
        if skill['adoption'] > 0.7:
            reasons.append("fast industry adoption")
        if skill['creativity'] < 0.3:
            reasons.append("low creative requirement")
        
        # Generate explanations
        why = f"This skill is at {metrics['risk_level']} extinction risk due to {', '.join(reasons)}."
        
        how = f"AI-powered tools and automation platforms are increasingly capable of handling {skill['name']} tasks with minimal human intervention. Tools like automated testing frameworks, low-code platforms, and AI code generators are replacing traditional manual approaches."
        
        when = f"Based on current trends, this skill's relevance may decline significantly within {metrics['half_life']} years. Organizations are rapidly adopting automated solutions, reducing demand for manual expertise in this area."
        
        # Suggest alternatives
        alternatives = self._suggest_alternatives(skill, metrics)
        
        return {
            "why": why,
            "how": how,
            "when": when,
            "alternatives": alternatives
        }
    
    def _suggest_alternatives(self, skill: Dict, metrics: Dict) -> List[str]:
        """Suggest alternative skills based on current skill"""
        alternatives_map = {
            "Data": ["AI-Driven Analytics", "Data Engineering", "MLOps"],
            "Development": ["Software Architecture", "DevOps Engineering", "Cloud-Native Development"],
            "QA": ["Test Automation Engineering", "Performance Testing", "Security Testing"],
            "Operations": ["SRE", "Cloud Infrastructure", "Container Orchestration"],
            "AI": ["AI Strategy", "ML System Design", "Responsible AI Development"]
        }
        
        category = skill.get('category', 'Development')
        return alternatives_map.get(category, ["System Design", "Technical Leadership", "Innovation Management"])
    
    def process_skill(self, skill: Dict) -> Dict:
        """Process a skill and return complete analysis"""
        # Calculate metrics
        rfs = self.calculate_rfs(
            skill['automation'],
            skill['toolGrowth'],
            skill['adoption']
        )
        ps = self.calculate_ps(skill['creativity'])
        extinction_risk = self.calculate_extinction_risk(rfs, ps)
        half_life = self.calculate_half_life(skill['toolGrowth'])
        risk_level = self.determine_risk_level(extinction_risk)
        
        metrics = {
            "rfs": round(rfs, 2),
            "ps": round(ps, 2),
            "extinction_risk": round(extinction_risk, 1),
            "half_life": round(half_life, 1),
            "risk_level": risk_level
        }
        
        explanation = self.generate_explanation(skill, metrics)
        
        return {
            **skill,
            **metrics,
            "explanation": explanation
        }
    
    def process_multiple_skills(self, skills: List[Dict]) -> List[Dict]:
        """Process multiple skills"""
        return [self.process_skill(skill) for skill in skills]
    
    def get_category_summary(self, skills: List[Dict]) -> Dict:
        """Get summary statistics by category"""
        from collections import defaultdict
        import statistics
        
        category_data = defaultdict(list)
        
        for skill in skills:
            processed = self.process_skill(skill)
            category_data[skill['category']].append(processed['extinction_risk'])
        
        summary = {}
        for category, risks in category_data.items():
            summary[category] = {
                "count": len(risks),
                "avg_risk": round(statistics.mean(risks), 1),
                "max_risk": round(max(risks), 1),
                "min_risk": round(min(risks), 1)
            }
        
        return summary