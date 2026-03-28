import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type UserProfile = {
    displayName : Text;
    email : Text;
    targetRole : Text;
    resumeCount : Nat;
    lastAnalysisScore : Nat;
    createdAt : Int;
  };
  type NewActor = {
    profiles : Map.Map<Principal, UserProfile>;
  };

  public func run(_old : {}) : NewActor {
    { profiles = Map.empty<Principal, UserProfile>() };
  };
};
