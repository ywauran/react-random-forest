import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// Update collection reference for drugs
const drugsRef = collection(db, "drugs");

export async function createDrugs(data) {
  try {
    const docRef = await addDoc(drugsRef, {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
}

// Read operation for drugs
export async function getAllDrugs() {
  try {
    const drugsQuery = query(drugsRef, orderBy("createdAt", "desc")); // Order by createdAt field in descending order

    const snapshot = await getDocs(drugsQuery);
    const drugs = [];
    let lastVisible = null;

    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        drugs.push({ id: doc.id, ...doc.data() });
      });
      lastVisible = snapshot.docs[snapshot.docs.length - 1];
    } else {
      console.log("Tidak ada data obat yang ditemukan.");
    }

    console.log(drugs, lastVisible);

    return { drugs, lastVisible };
  } catch (error) {
    // Add additional error handling here if needed.
    throw error;
  }
}

export async function getDrugsById(id) {
  try {
    const docSnap = await getDoc(doc(drugsRef, id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Document does not exist");
    }
  } catch (error) {
    throw error;
  }
}

// Update operation for drugs
export async function updateDrugs(id, data) {
  try {
    await updateDoc(doc(drugsRef, id), data);
  } catch (error) {
    throw error;
  }
}

// Delete operation for drugs
export async function deleteDrugs(id) {
  try {
    await deleteDoc(doc(drugsRef, id));
  } catch (error) {
    throw error;
  }
}
