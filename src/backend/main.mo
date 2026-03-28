import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(with migration = Migration.run)
actor {
  type UserProfile = {
    displayName : Text;
    email : Text;
    targetRole : Text;
    resumeCount : Nat;
    lastAnalysisScore : Nat;
    createdAt : Int;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let profiles = Map.empty<Principal, UserProfile>();

  // Get caller's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    profiles.get(caller);
  };

  // Legacy function - get caller's own profile
  public query ({ caller }) func getProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    profiles.get(caller);
  };

  // Get any user's profile (admin only, or own profile)
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    profiles.get(user);
  };

  // Save caller's own profile
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    
    // Check if profile exists to preserve createdAt
    let existingProfile = profiles.get(caller);
    let newProfile = switch (existingProfile) {
      case (?existing) {
        // Update existing profile, preserve createdAt
        {
          displayName = profile.displayName;
          email = profile.email;
          targetRole = profile.targetRole;
          resumeCount = profile.resumeCount;
          lastAnalysisScore = profile.lastAnalysisScore;
          createdAt = existing.createdAt;
        };
      };
      case null {
        // New profile, set createdAt to now
        {
          displayName = profile.displayName;
          email = profile.email;
          targetRole = profile.targetRole;
          resumeCount = profile.resumeCount;
          lastAnalysisScore = profile.lastAnalysisScore;
          createdAt = Time.now();
        };
      };
    };
    
    profiles.add(caller, newProfile);
  };

  // Legacy function - save caller's own profile
  public shared ({ caller }) func saveProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    
    // Check if profile exists to preserve createdAt
    let existingProfile = profiles.get(caller);
    let newProfile = switch (existingProfile) {
      case (?existing) {
        // Update existing profile, preserve createdAt
        {
          displayName = profile.displayName;
          email = profile.email;
          targetRole = profile.targetRole;
          resumeCount = profile.resumeCount;
          lastAnalysisScore = profile.lastAnalysisScore;
          createdAt = existing.createdAt;
        };
      };
      case null {
        // New profile, set createdAt to now
        {
          displayName = profile.displayName;
          email = profile.email;
          targetRole = profile.targetRole;
          resumeCount = profile.resumeCount;
          lastAnalysisScore = profile.lastAnalysisScore;
          createdAt = Time.now();
        };
      };
    };
    
    profiles.add(caller, newProfile);
  };

  // Delete caller's own profile
  public shared ({ caller }) func deleteProfile() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete profiles");
    };
    profiles.remove(caller);
  };

  // Get statistics - admin only for privacy
  public query ({ caller }) func getStats() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view statistics");
    };
    profiles.size();
  };
};
