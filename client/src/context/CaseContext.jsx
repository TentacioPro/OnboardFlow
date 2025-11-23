import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { INITIAL_DATA } from '../constants';
import * as api from '../services/api';

import { useAuth } from './AuthContext';

const CaseContext = createContext(undefined);

export const CaseProvider = ({ children }) => {
    const { token, loading: authLoading } = useAuth();
    const [cases, setCases] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Fetch real cases on load
    useEffect(() => {
        if (authLoading) return; // Wait for auth to initialize

        const loadCases = async () => {
            try {
                const { data } = await api.fetchCases();
                setCases(data);
            } catch (err) {
                console.error("API Error", err);
                // Keep fallback to INITIAL_DATA if you want dev mode support
                setCases(INITIAL_DATA);
            } finally {
                setLoading(false);
            }
        };
        loadCases();
    }, [authLoading, token]);

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

    // 2. Updated addDocument (The AI Trigger)
    const addDocument = async (caseId, file) => {
        try {
            setLoading(true);
            // Call the Backend -> Python -> Watsonx
            const { data } = await api.uploadAndAnalyze(caseId, file);

            // Update State with the REAL analysis
            setCases(prev => prev.map(c => {
                if (c.id !== caseId) return c;
                return {
                    ...c,
                    documents: [...c.documents, data.document], // Add the new doc with analysis
                    // You can also update case-level summary here if you want
                };
            }));

            return data; // Return data so the UI can navigate or show success
        } catch (err) {
            console.error("Upload failed", err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
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
