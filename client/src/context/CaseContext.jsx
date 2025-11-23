import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { INITIAL_DATA } from '../constants';

const CaseContext = createContext(undefined);

export const CaseProvider = ({ children }) => {
    const [cases, setCases] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cases', {
                    headers: { 'x-role': 'hr-manager' }
                });
                setCases(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch cases:", err);
                setError(err);
                setCases(INITIAL_DATA); // Fallback to mock
                setLoading(false);
            }
        };
        fetchCases();
    }, []);

    const getCase = (id) => cases.find((c) => c.id === id);

    const toggleAction = (caseId, actionId) => {
        setCases((prev) =>
            prev.map((c) => {
                if (c.id !== caseId) return c;
                const updatedActions = c.actions.map((a) =>
                    a.id === actionId ? { ...a, completed: !a.completed } : a
                );

                // Recalculate score simply based on actions for demo
                const completed = updatedActions.filter(a => a.completed).length;
                const total = updatedActions.length;
                const newScore = total === 0 ? 0 : Math.round((completed / total) * 100);

                return { ...c, actions: updatedActions, readinessScore: newScore };
            })
        );
    };

    const deleteDocument = (caseId, documentId) => {
        setCases((prev) =>
            prev.map((c) =>
                c.id === caseId
                    ? { ...c, documents: c.documents.filter((d) => d.id !== documentId) }
                    : c
            )
        );
    };

    const addDocument = (caseId, file) => {
        const newDoc = {
            id: `new-${Date.now()}`,
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
            uploadDate: new Date().toISOString().split('T')[0],
            type: file.type,
        };

        setCases((prev) =>
            prev.map((c) =>
                c.id === caseId ? { ...c, documents: [...c.documents, newDoc] } : c
            )
        );
    };

    const updateSummaryStatus = (caseId, summaryId, status, newValue) => {
        setCases((prev) =>
            prev.map((c) => {
                if (c.id !== caseId) return c;
                const updatedSummary = c.summary.map((s) =>
                    s.id === summaryId
                        ? { ...s, status, value: newValue || s.value }
                        : s
                );
                return { ...c, summary: updatedSummary };
            })
        );
    };

    return (
        <CaseContext.Provider
            value={{
                cases,
                searchQuery,
                setSearchQuery,
                getCase,
                toggleAction,
                deleteDocument,
                addDocument,
                updateSummaryStatus,
                loading,
                error
            }}
        >
            {children}
        </CaseContext.Provider>
    );
};

export const useCases = () => {
    const context = useContext(CaseContext);
    if (!context) {
        throw new Error('useCases must be used within a CaseProvider');
    }
    return context;
};
