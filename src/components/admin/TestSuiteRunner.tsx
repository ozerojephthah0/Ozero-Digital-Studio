import React from 'react';
import {
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { useStudio } from '../../context/StudioContext';
import { Button } from '../common/Button';

export const TestSuiteRunner: React.FC = () => {
  const { testResults, isTestRunning, runAutomatedTests } = useStudio();

  const passedCount = testResults.filter(t => t.status === 'passed').length;
  const failedCount = testResults.filter(t => t.status === 'failed').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>Automated Verification & Test Runner</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Automated test scripts covering owner authentication, enquiry validation, dynamic pricing, portfolio integrity, and data security.
          </p>
        </div>

        <Button
          size="md"
          variant="primary"
          actionName="Run Automated Test Suite"
          onClick={runAutomatedTests}
          disabled={isTestRunning}
          icon={isTestRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
        >
          {isTestRunning ? 'Executing Test Suite...' : 'Run All Test Suites'}
        </Button>
      </div>

      {/* Test Stats Header */}
      {testResults.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-xs text-slate-400">Total Executed</div>
            <div className="text-2xl font-bold font-mono text-white mt-1">{testResults.length}</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center">
            <div className="text-xs text-emerald-300 font-semibold">Passed Checks</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{passedCount}</div>
          </div>
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-center">
            <div className="text-xs text-rose-300 font-semibold">Failed Checks</div>
            <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{failedCount}</div>
          </div>
        </div>
      )}

      {/* Test Results Log */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">TEST CONSOLE OUTPUT</span>
          <span className="text-slate-500">{isTestRunning ? 'Running in progress...' : testResults.length > 0 ? 'Completed' : 'Idle'}</span>
        </div>

        <div className="p-4 divide-y divide-slate-800/80 max-h-96 overflow-y-auto font-mono text-xs">
          {testResults.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No test run in this session. Click "Run All Test Suites" above to trigger automated tests.
            </div>
          ) : (
            testResults.map(test => (
              <div key={test.id} className="py-3 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {test.status === 'passed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">{test.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-cyan-400">
                        {test.category}
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{test.message}</div>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-500 shrink-0">
                  <span>{test.durationMs}ms</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
