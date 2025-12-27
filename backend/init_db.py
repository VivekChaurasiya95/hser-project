"""
HSER Database Initialization Script
Includes Google OAuth support fields
"""
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import os

# Database configuration
DATABASE_URL = "sqlite:///./hser.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()

class User(Base):
    """User model with Google OAuth support"""
    __tablename__ = "users"
    
    # Primary fields
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    
    # Authentication fields
    password = Column(String(255), nullable=True)  # Optional for Google users
    
    # Profile fields
    organization = Column(String(255), nullable=True)
    user_type = Column(String(50), default="user")  # 'user' or 'admin'
    
    # Status fields
    is_active = Column(Boolean, default=True)
    
    # Google OAuth fields (NEW)
    is_google_user = Column(Boolean, default=False)
    google_id = Column(String(255), nullable=True, unique=True)
    
    # Timestamp
    created_at = Column(DateTime, default=datetime.utcnow)

def init_database():
    """Initialize database with fresh schema"""
    print("=" * 70)
    print("🔧 HSER Database Initialization")
    print("=" * 70)
    
    # Check if database exists
    db_exists = os.path.exists("hser.db")
    if db_exists:
        print("⚠️  Existing database found: hser.db")
        print("🗑️  Dropping all existing tables...")
        Base.metadata.drop_all(bind=engine)
        print("✅ Old tables dropped successfully")
    else:
        print("📁 No existing database found")
    
    print("\n🏗️  Creating new database schema...")
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    print("=" * 70)
    print("✅ DATABASE INITIALIZED SUCCESSFULLY!")
    print("=" * 70)
    
    # Display table structure
    print("\n📋 Table: users")
    print("   " + "-" * 60)
    print("   ├─ id              : Integer (Primary Key, Auto-increment)")
    print("   ├─ name            : String(255) - User's full name")
    print("   ├─ email           : String(255) - Unique, Indexed")
    print("   ├─ password        : String(255) - Optional (null for Google users)")
    print("   ├─ organization    : String(255) - Optional")
    print("   ├─ user_type       : String(50)  - 'user' or 'admin'")
    print("   ├─ is_active       : Boolean     - Default: True")
    print("   ├─ is_google_user  : Boolean     - Default: False (NEW!)")
    print("   ├─ google_id       : String(255) - Google user ID (NEW!)")
    print("   └─ created_at      : DateTime    - Auto-generated")
    print("   " + "-" * 60)
    
    print("\n✨ Features Supported:")
    print("   ✅ Email/Password Authentication")
    print("   ✅ Google OAuth 2.0 Authentication")
    print("   ✅ User and Admin roles")
    print("   ✅ Optional organization field")
    print("   ✅ Account status tracking")
    
    print("\n🚀 Next Steps:")
    print("   1. Ensure backend/.env has GOOGLE_CLIENT_ID configured")
    print("   2. Start backend: uvicorn main:app --reload")
    print("   3. Start frontend: npm start")
    print("   4. Test Google Sign-In at http://localhost:3000")
    
    print("\n" + "=" * 70)
    print("🎉 Ready for authentication!")
    print("=" * 70)

def verify_database():
    """Verify database was created correctly"""
    try:
        from sqlalchemy import inspect
        inspector = inspect(engine)
        
        print("\n🔍 Verifying database...")
        
        # Check if users table exists
        tables = inspector.get_table_names()
        if 'users' in tables:
            print("✅ Table 'users' exists")
            
            # Check columns
            columns = [col['name'] for col in inspector.get_columns('users')]
            required_columns = [
                'id', 'name', 'email', 'password', 'organization', 
                'user_type', 'is_active', 'is_google_user', 'google_id', 'created_at'
            ]
            
            missing = [col for col in required_columns if col not in columns]
            if missing:
                print(f"⚠️  Missing columns: {', '.join(missing)}")
            else:
                print("✅ All required columns present")
            
            # Check for Google OAuth columns specifically
            if 'is_google_user' in columns and 'google_id' in columns:
                print("✅ Google OAuth fields configured correctly")
            else:
                print("❌ Google OAuth fields missing!")
                
        else:
            print("❌ Table 'users' not found!")
            
    except Exception as e:
        print(f"⚠️  Verification error: {e}")

if __name__ == "__main__":
    try:
        init_database()
        verify_database()
        
        print("\n" + "=" * 70)
        print("💡 TIP: To reset the database, simply run this script again")
        print("=" * 70 + "\n")
        
    except Exception as e:
        print("\n" + "=" * 70)
        print("❌ ERROR DURING INITIALIZATION")
        print("=" * 70)
        print(f"\nError: {e}")
        print("\nTroubleshooting:")
        print("  1. Make sure you're in the backend directory")
        print("  2. Ensure SQLAlchemy is installed: pip install sqlalchemy")
        print("  3. Check file permissions")
        print("  4. Try deleting hser.db manually and run again")
        print("\n" + "=" * 70 + "\n")
        raise
