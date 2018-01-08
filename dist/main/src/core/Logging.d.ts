/// <reference types="node" />
import { EventEmitter } from "events";
import * as Messages from "./Messages";
/**
 * Enumeration of log levels for LogMessage message types. Log levels must match
 * order and name specified in LogMessage portion of the Buttplug protocol spec.
 */
export declare enum LogLevel {
    Off = 0,
    Fatal = 1,
    Error = 2,
    Warn = 3,
    Info = 4,
    Debug = 5,
    Trace = 6,
}
/**
 * Representation of log messages for the internal logging utility.
 */
export declare class LogMessage {
    /** Timestamp for the log message */
    private timestamp;
    /** Log Message */
    private logMessage;
    /** Log Level */
    private logLevel;
    /**
     * @param logMessage Log message.
     * @param logLevel: Log severity level.
     */
    constructor(logMessage: string, logLevel: LogLevel);
    /**
     * Returns the log message.
     */
    readonly Message: string;
    /**
     * Returns the log message level.
     */
    readonly LogLevel: LogLevel;
    /**
     * Returns the log message timestamp.
     */
    readonly Timestamp: string;
    /**
     * Returns a formatted string with timestamp, level, and message.
     */
    readonly FormattedMessage: string;
}
/**
 * Simple, global logging utility for the Buttplug client and server. Keeps an
 * internal static reference to an instance of itself (singleton pattern,
 * basically), and allows message logging throughout the module.
 */
export declare class ButtplugLogger extends EventEmitter {
    /** Singleton instance for the logger */
    protected static sLogger: ButtplugLogger | undefined;
    /** Array of stored log messages */
    protected logMessages: LogMessage[];
    /** Size limit of logMessages array */
    protected logLimit: number;
    /** If true, call console.log on all new log messages */
    protected logToConsole: boolean;
    /** If logToConsole is true, sets maximum log level to log to console */
    protected maximumLogLevel: LogLevel;
    /**
     * Returns the stored static instance of the logger, creating one if it
     * doesn't currently exist.
     */
    static readonly Logger: ButtplugLogger;
    /**
     * Constructor. Can only be called internally since we regulate ButtplugLogger
     * ownership.
     */
    protected constructor();
    /**
     * Set the maximum log level to output to console.
     */
    /**
     * Get the maximum log level to output to console.
     */
    MaximumLogLevel: LogLevel;
    /**
     * Log a message, then create a Error buttplug message with the log message.
     * Used when an operation has errored out and status needs to be both logged
     * and returned to the client as an Error Message type.
     */
    LogAndError(aMsg: string, aErrorClass: Messages.ErrorClass, aMsgId: number): Messages.ButtplugMessage;
    /**
     * Sets whether log messages are logged to the web console.
     */
    SetConsoleLogging(aShouldLog: boolean): void;
    /**
     * Log new message at Fatal level.
     */
    Fatal(aMsg: string): void;
    /**
     * Log new message at Error level.
     */
    Error(aMsg: string): void;
    /**
     * Log new message at Warn level.
     */
    Warn(aMsg: string): void;
    /**
     * Log new message at Info level.
     */
    Info(aMsg: string): void;
    /**
     * Log new message at Debug level.
     */
    Debug(aMsg: string): void;
    /**
     * Log new message at Trace level.
     */
    Trace(aMsg: string): void;
    /**
     * Checks to see if message should be logged, and if so, adds message to the
     * log buffer. May also print message and emit event.
     */
    protected AddLogMessage(aMsg: string, aLevel: LogLevel): void;
}