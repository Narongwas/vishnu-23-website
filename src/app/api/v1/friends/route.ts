import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/services/firebase.admin";
import { firebaseAuthMiddleware } from "@/lib/middleware/firebaseAuthMiddleware";

export async function GET(request: NextRequest) {
  try {
    const { uid, error } = await firebaseAuthMiddleware(request);

    if (error || !uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const friendsList = await fetch(`api/v1/friends/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const friendsData = await friendsList.json();

    return NextResponse.json(
      {
        friends: friendsData.friendId || [],
      },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("Error fetching friends:", e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// this is an API route to add a friend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { friendId } = body;

    const { uid, error } = await firebaseAuthMiddleware(request);

    if (error || !uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.collection("users").doc(uid).get();
    const friend = await db.collection("users").doc(friendId).get();

    if (!user.exists || !friend.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.data()?.friends.includes(friendId)) {
      return NextResponse.json(
        { error: "This user was already your friend" },
        { status: 400 }
      );
    }

    await user.ref.update({
      friends: [...user.data()?.friends, friendId],
    });

    await friend.ref.update({
      friends: [...friend.data()?.friends, uid],
    });

    return NextResponse.json(
      {
        friend: {
          id: friend.id,
          name: friend.data()?.name,
          email: friend.data()?.email,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error adding friend:", e);
    return NextResponse.json({ error: "Error to add friend" }, { status: 500 });
  }
}

//this is an API route to remove a friend
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { friendId } = body;
    const { uid, error } = await firebaseAuthMiddleware(request);

    if (error || !uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.collection("users").doc(uid).get();
    const friend = await db.collection("users").doc(friendId).get();

    if (!user.exists || !friend.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.data()?.friends.includes(friendId)) {
      return NextResponse.json(
        { error: "This user is not your friend" },
        { status: 400 }
      );
    }

    await user.ref.update({
      friends: user.data()?.friends.filter((f: string) => f !== friendId),
    });

    await friend.ref.update({
      friends: friend.data()?.friends.filter((f: string) => f !== uid),
    });

    return NextResponse.json(
      {
        friend: {
          id: friend.id,
          name: friend.data()?.name,
          email: friend.data()?.email,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error removing friend:", e);
    return NextResponse.json(
      { error: "Error to remove friend" },
      { status: 500 }
    );
  }
}
