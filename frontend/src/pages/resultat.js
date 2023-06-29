import React, { useEffect, useState, useCallback } from "react";
import { getData } from "../middleware/connexionBack";

export default function Resultat() {
    const [voters, setVoters] = useState([]);
    const [resultat, setResultat] = useState([]);

    // Get data from the API
    const getCandidatData = useCallback(async () => {
        try {
            const userData = await getData("users");
            const candidateData = await getData("candidates");

            const combinedData = candidateData.map((candidate) => {
                const matchingUser = userData.find(
                    (user) => user._id === candidate.userId
                );
                return {
                    ...matchingUser,
                    ...candidate,
                    _id: candidate._id,
                };
            });
            setVoters(combinedData);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const getResulatData = useCallback(async () => {
        try {
            const resultatData = await getData("getVotes");
            setResultat(resultatData);
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        getCandidatData().then((r) => console.log(r));
        getResulatData().then((r) => console.log(r));
    }, [getCandidatData]);

    const totalVote = resultat.length;

    const vote = resultat.filter((result) => result.candidateId.length === 1);

    // Regroup votes by candidate
    const candidat = voters.map((voter) => {
        const matchingVote = resultat.filter(
            (result) => result.candidateId[0] === voter._id
        );
        return {
            ...voter,
            ...matchingVote,
            _id: voter._id,
        };
    });

    // Count votes for each candidate
    const countVotes = candidat.reduce((acc, candidate) => {
        const votes = candidate.length;
        if (!acc[candidate.name]) {
            acc[candidate.name] = votes;
        } else {
            acc[candidate.name] += votes;
        }
        return acc;
    }, {});

    return (
        <div>
            <h1>Resultat</h1>
            <p>Nombre total de votes : {totalVote}</p>
            {/* Afficher le nombre de votes pour chaque candidat */}
            {Object.entries(countVotes).map(([candidate, votes]) => (
                <p key={candidate}>
                    Votes de {candidate}: {votes}
                </p>
            ))}
        </div>
    );
}